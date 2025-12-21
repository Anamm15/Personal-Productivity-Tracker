import { NextResponse } from "next/server";
import crypto from "crypto";
import webPush from "web-push";
import { db } from "@/lib/db";
import { tasks } from "@/database/schema/task";
import { pushSubscriptions } from "@/database/schema/subscription";
import { eq, lte, and, inArray } from "drizzle-orm";
import { localISODate } from "@/utils/datetime";

webPush.setVapidDetails(
  `mailto:${process.env.VAPID_EMAIL}`,
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

function isValidSecret(requestSecret: string | null): boolean {
  const serverSecret = process.env.CRON_SECRET;
  if (!serverSecret || !requestSecret) return false;
  if (requestSecret.length !== serverSecret.length) return false;
  return crypto.timingSafeEqual(
    Buffer.from(requestSecret),
    Buffer.from(serverSecret)
  );
}

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const token = authHeader.split(" ")[1];
    if (!isValidSecret(token)) {
      return NextResponse.json({ message: "Invalid Token" }, { status: 401 });
    }
    const { isoDate: currentDate, isoTime: currentTime } = localISODate(
      new Date()
    );

    console.log(
      `[Cron] Checking tasks for Date: ${currentDate}, Time <= ${currentTime}`
    );

    const pendingTasks = await db
      .select({
        task: tasks,
        subscription: pushSubscriptions,
      })
      .from(tasks)
      .innerJoin(pushSubscriptions, eq(tasks.userId, pushSubscriptions.userId))
      .where(
        and(
          eq(tasks.date, currentDate),
          lte(tasks.reminder, currentTime),
          eq(tasks.reminderStatus, "PENDING")
        )
      );

    if (pendingTasks.length === 0) {
      return NextResponse.json({
        success: true,
        count: 0,
        message: "No tasks pending",
      });
    }

    // 4. KIRIM NOTIFIKASI (Batching)
    const notifications = pendingTasks.map(async ({ task, subscription }) => {
      const payload = JSON.stringify({
        title: `Pengingat: ${task.title}`,
        body:
          task.description || `Waktunya mengerjakan tugas jam ${task.reminder}`,

        // 1. Icon Utama (Biasanya logo aplikasi / avatar) - Kotak di kanan/kiri
        icon: "/icons/icon-192x192.png",

        // 2. Image (Hero Image) - Gambar besar di bawah teks (Sangat efektif di Android/Windows)
        // Bisa dinamis, misal gambar terkait task atau banner default yang cantik
        image: "/images/notification-banner.png",

        // 3. Badge (Monochrome Icon) - Icon kecil di status bar Android (Wajib transparan & putih)
        badge: "/icons/badge-monochrome.png",

        // 4. Actions (Tombol Interaktif)
        actions: [
          {
            action: "view-task",
            title: "Lihat Detail",
          },
          {
            action: "mark-done",
            title: "Selesai",
          },
        ],

        // 5. Data untuk logic klik
        data: {
          url: `/timeline`,
          taskId: task.id,
        },
      });

      const sub = {
        endpoint: subscription.endpoint,
        keys: subscription.keys as { p256dh: string; auth: string },
      };

      try {
        await webPush.sendNotification(sub, payload);
        return { status: "fulfilled", taskId: task.id };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        // Jika endpoint sudah tidak valid (user unsubscribe/clear cache), hapus dari DB
        if (error.statusCode === 410 || error.statusCode === 404) {
          console.log(
            `Subscription expired for user ${task.userId}, deleting...`
          );
          await db
            .delete(pushSubscriptions)
            .where(eq(pushSubscriptions.endpoint, subscription.endpoint));
        }
        console.error(`Failed to send to task ${task.id}:`, error);
        return { status: "rejected", taskId: task.id };
      }
    });

    const results = await Promise.allSettled(notifications);

    // 5. UPDATE STATUS TASK JADI 'SENT'
    const sentTaskIds = results
      .filter(
        (res) =>
          res.status === "fulfilled" &&
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (res.value as any).status === "fulfilled"
      )
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((res) => (res as any).value.taskId);

    // Gunakan Set untuk unique ID (karena 1 user bisa punya banyak device/subscription, query di atas join)
    const uniqueTaskIds = [...new Set(sentTaskIds)];

    if (uniqueTaskIds.length > 0) {
      await db
        .update(tasks)
        .set({ reminderStatus: "SENT" })
        .where(inArray(tasks.id, uniqueTaskIds));
    }

    return NextResponse.json({
      success: true,
      processed: pendingTasks.length,
      sent: uniqueTaskIds.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[Cron Error]", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
