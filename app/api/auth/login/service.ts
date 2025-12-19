import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { users } from "@/database/schema/user";
import { comparePassword } from "@/utils/bcrypt";
import { generateToken } from "@/utils/jwt";
import { AppError } from "@/lib/exceptions"; // Import custom error

export async function Login(email: string, password: string): Promise<string> {
  const userQuery = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  const user = userQuery[0];
  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", 401);
  }

  const token: string = generateToken({ userId: user.id, email: user.email });
  return token;
}
