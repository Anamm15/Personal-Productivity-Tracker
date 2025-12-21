import { AppError } from "@/lib/exceptions";
import { buildFailedResponse, buildSuccessResponse } from "@/lib/response";
import { NextResponse } from "next/server";
import { subscribe } from "./service";

export async function POST(req: Request) {
  try {
    const sub = await req.json();

    const userId = req.headers.get("x-user-id");
    if (!userId) {
      throw new AppError("Unauthorized", 401);
    }

    const response = await subscribe(userId, sub);
    return buildSuccessResponse(response, "Subscribed successfully", 200);
  } catch (error) {
    if (error instanceof AppError) {
      return buildFailedResponse(error.message, null, error.statusCode);
    }

    console.error("[SUBSCRIBE_ERROR]", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
