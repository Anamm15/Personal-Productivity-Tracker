import { tasks } from "@/database/schema/task";
import { db } from "@/lib/db";
import { localISODate } from "@/utils/datetime";

export async function CreateQuickTask(userId: string, command: string) {
  // template title @startTime-@endTime
  const regex =
    /^(.+?)\s+@([01]\d|2[0-3]):([0-5]\d)-([01]\d|2[0-3]):([0-5]\d)$/;
  const match = command.match(regex);
  if (!match) {
    throw new Error("Invalid command format");
  }

  const title = match[1];
  const startTime = `${match[2]}:${match[3]}`;
  const endTime = `${match[4]}:${match[5]}`;
  const date = localISODate(new Date()).isoDate;

  const task = await db
    .insert(tasks)
    .values({
      userId: userId,
      title: title,
      description: "",
      date: date,
      startTime: startTime,
      endTime: endTime,
    })
    .returning();

  return task[0];
}
