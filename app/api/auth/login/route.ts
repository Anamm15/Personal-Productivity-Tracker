import { LoginRequestDTO } from "@/types/dto/auth";
import { Login } from "./service";
import { buildSuccessResponse, buildFailedResponse } from "@/lib/response";
import { AppError } from "@/lib/exceptions";
import { loginSchema } from "./validation";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validation = loginSchema.safeParse(body);
    if (!validation.success) {
      return buildFailedResponse(
        "Invalid input data",
        validation.error.format(),
        400
      );
    }

    const data: LoginRequestDTO = validation.data;
    const token = await Login(data.email, data.password);
    return buildSuccessResponse({ token }, "Login successful", 200);
  } catch (error) {
    if (error instanceof AppError) {
      return buildFailedResponse(error.message, null, error.statusCode);
    }

    console.error("[LOGIN_ERROR]", error);
    return buildFailedResponse("Internal Server Error", null, 500);
  }
}
