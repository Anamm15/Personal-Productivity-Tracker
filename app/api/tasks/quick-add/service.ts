import { localISODate } from "@/utils/datetime";
import { insertTask } from "../repository";
import { TaskResponse } from "@/types/dto/task";

export async function CreateQuickTask(
  userId: string,
  command: string,
): Promise<TaskResponse> {
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

  const task = {
    title: title,
    description: "",
    date: date,
    startTime: startTime,
    endTime: endTime,
  };

  const insertedTask = await insertTask(userId, task);
  return insertedTask[0];
}
