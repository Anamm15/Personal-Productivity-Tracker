import { AppError } from "@/lib/exceptions";
import { buildFailedResponse, buildSuccessResponse } from "@/lib/response";
import { NextRequest } from "next/server";
import { CreateGoal, GetGoals } from "./service";
import { createGoalSchema } from "./validation";

export async function GET(req: NextRequest) {
  try {
    const userId = req.headers.get("x-user-id");
    const date = new URL(req.url).searchParams.get("date");
    if (!userId) {
      throw new AppError("Unauthorized", 401);
    }

    if (!date) {
      throw new AppError("Date is required", 400);
    }

    const goals = await GetGoals(userId, date);
    return buildSuccessResponse(goals, "Goals fetched successfully", 200);
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
    const validation = createGoalSchema.safeParse(body);
    if (!validation.success) {
      return buildFailedResponse(
        "Invalid input data",
        validation.error.flatten().fieldErrors,
        400
      );
    }

    const validData = validation.data;
    const newGoal = await CreateGoal(userId, validData);
    return buildSuccessResponse(newGoal, "Goal created successfully", 201);
  } catch (error) {
    if (error instanceof AppError) {
      return buildFailedResponse(error.message, null, error.statusCode);
    }

    console.error("[SERVER_ERROR]", error);
    return buildFailedResponse("Internal Server Error", null, 500);
  }
}
