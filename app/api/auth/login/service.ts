import { comparePassword } from "@/utils/bcrypt";
import { generateToken } from "@/utils/jwt";
import { AppError } from "@/lib/exceptions";
import { getUserByEmail } from "../../users/repository";

export async function Login(email: string, password: string): Promise<string> {
  const user = await getUserByEmail(email);
  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", 401);
  }

  const token: string = await generateToken({
    userId: user.id,
    email: user.email,
  });
  return token;
}
