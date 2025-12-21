import { pushSubscriptions } from "@/database/schema/subscription";
import { db } from "@/lib/db";
import { subscribeRequest } from "@/types/dto/subscription";

export async function subscribe(userId: string, sub: subscribeRequest) {
  const result = await db
    .insert(pushSubscriptions)
    .values({
      userId,
      endpoint: sub.endpoint,
      keys: sub.keys,
    })
    .onConflictDoNothing()
    .returning();

  return result[0];
}
