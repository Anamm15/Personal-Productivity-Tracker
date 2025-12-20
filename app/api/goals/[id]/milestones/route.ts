import { AppError } from "@/lib/exceptions";
import { buildFailedResponse, buildSuccessResponse } from "@/lib/response";
import { NextRequest } from "next/server";
import { CreateMilestone } from "./service";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = req.headers.get("x-user-id");
    if (!userId) {
      throw new AppError("Unauthorized", 401);
    }

    const { id: goalId } = await params;
    const body = await req.json();
    if (!body && !body.title) {
      throw new AppError("Invalid input data", 400);
    }

    const newMilestone = await CreateMilestone(userId, goalId, body);
    return buildSuccessResponse(
      newMilestone,
      "Milestone created successfully",
      201
    );
  } catch (error) {
    if (error instanceof AppError) {
      return buildFailedResponse(error.message, null, error.statusCode);
    }

    console.error("[SERVER_ERROR]", error);
    return buildFailedResponse("Internal Server Error", null, 500);
  }
}
