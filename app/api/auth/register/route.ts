import { RegisterRequestDTO } from "@/types/dto/auth";
import { Register } from "./service";
import { buildFailedResponse, buildSuccessResponse } from "@/lib/response";
import { AppError } from "@/lib/exceptions";
import { registerSchema } from "./validation";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validation = registerSchema.safeParse(body);

    if (!validation.success) {
      return buildFailedResponse(
        "Invalid input data",
        validation.error.flatten().fieldErrors,
        400
      );
    }

    const data: RegisterRequestDTO = validation.data;
    const newUser = await Register(data.name, data.email, data.password);
    return buildSuccessResponse(newUser, "User created successfully", 201);
  } catch (error) {
    if (error instanceof AppError) {
      return buildFailedResponse(error.message, null, error.statusCode);
    }

    console.error("[REGISTER_ERROR]", error);
    return buildFailedResponse("Internal Server Error", null, 500);
  }
}
