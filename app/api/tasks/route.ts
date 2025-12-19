import { AppError } from "@/lib/exceptions";
import { buildFailedResponse, buildSuccessResponse } from "@/lib/response";
import { NextRequest } from "next/server";
import { CreateTask, GetTasks } from "./service";
import { createTaskSchema } from "./validation";

export async function GET(req: NextRequest) {
  try {
    const userId = req.headers.get("x-user-id");
    if (!userId) {
      throw new AppError("Unauthorized", 401);
    }

    const { searchParams } = new URL(req.url);
    const date =
      searchParams.get("date") ?? new Date().toISOString().split("T")[0];

    const tasks = await GetTasks(date, userId);

    return buildSuccessResponse(tasks, "Tasks fetched successfully", 200);
  } catch (error) {
    if (error instanceof AppError) {
      return buildFailedResponse(error.message, null, error.statusCode);
    }

    console.error("[SERVER_ERROR]", error);
    return buildFailedResponse("Internal Server Error", null, 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const userId = req.headers.get("x-user-id");
    if (!userId) {
      throw new AppError("Unauthorized", 401);
    }

    const body = await req.json();
    const validation = createTaskSchema.safeParse(body);
    if (!validation.success) {
      return buildFailedResponse(
        "Invalid input data",
        validation.error.flatten().fieldErrors,
        400
      );
    }

    const validData = validation.data;
    const newTask = await CreateTask({
      ...validData,
      userId: userId,
    });

    return buildSuccessResponse(newTask, "Task created successfully", 201);
  } catch (error) {
    if (error instanceof AppError) {
      return buildFailedResponse(error.message, null, error.statusCode);
    }

    console.error("[SERVER_ERROR]", error);
    return buildFailedResponse("Internal Server Error", null, 500);
  }
}
