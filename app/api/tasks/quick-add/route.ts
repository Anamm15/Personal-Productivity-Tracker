import { AppError } from "@/lib/exceptions";
import { buildFailedResponse, buildSuccessResponse } from "@/lib/response";
import { NextRequest } from "next/server";
import { CreateQuickTask } from "./service";

export async function POST(req: NextRequest) {
  try {
    const userId = req.headers.get("x-user-id");
    if (!userId) {
      throw new AppError("Unauthorized", 401);
    }

    const body = await req.json();
    if (!body || !body.command) {
      throw new AppError("Command is required", 400);
    }

    const task = await CreateQuickTask(userId, body.command);
    return buildSuccessResponse(task, "Task created successfully", 201);
  } catch (error) {
    if (error instanceof AppError) {
      return buildFailedResponse(error.message, null, error.statusCode);
    }

    console.error("[SERVER_ERROR]", error);
    return buildFailedResponse("Internal Server Error", null, 500);
  }
}
