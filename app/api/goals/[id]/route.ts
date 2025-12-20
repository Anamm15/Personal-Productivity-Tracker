import { AppError } from "@/lib/exceptions";
import { buildFailedResponse, buildSuccessResponse } from "@/lib/response";
import { NextRequest } from "next/server";
import { updateGoalSchema } from "./validation";
import { Delete, Update } from "./service";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = req.headers.get("x-user-id");
    if (!userId) {
      throw new AppError("Unauthorized", 401);
    }

    const { id } = await params;
    const body = await req.json();
    const validation = updateGoalSchema.safeParse(body);
    if (!validation.success) {
      return buildFailedResponse(
        "Invalid input data",
        validation.error.flatten().fieldErrors,
        400
      );
    }

    const validData = validation.data;
    const updatedGoal = await Update(id, userId, validData);
    return buildSuccessResponse(updatedGoal, "Goal updated successfully", 200);
  } catch (error) {
    if (error instanceof AppError) {
      return buildFailedResponse(error.message, null, error.statusCode);
    }

    console.error("[SERVER_ERROR]", error);
    return buildFailedResponse("Internal Server Error", null, 500);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = req.headers.get("x-user-id");
    if (!userId) {
      throw new AppError("Unauthorized", 401);
    }

    const { id } = await params;
    const deletedGoal = await Delete(id, userId);
    return buildSuccessResponse(deletedGoal, "Goal deleted successfully", 200);
  } catch (error) {
    if (error instanceof AppError) {
      return buildFailedResponse(error.message, null, error.statusCode);
    }

    console.error("[SERVER_ERROR]", error);
    return buildFailedResponse("Internal Server Error", null, 500);
  }
}
