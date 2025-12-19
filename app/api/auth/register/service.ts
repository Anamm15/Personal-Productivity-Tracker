import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { users } from "@/database/schema/user";
import { UserResponseDTO } from "@/types/dto/user";
import { hashPassword } from "@/utils/bcrypt";
import { AppError } from "@/lib/exceptions";

export async function Register(
  name: string,
  email: string,
  password: string
): Promise<UserResponseDTO> {
  const existingUser = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    throw new AppError("Email already registered", 409);
  }

  const hashedPassword = await hashPassword(password);
  const insertedUsers = await db
    .insert(users)
    .values({
      name,
      email,
      password: hashedPassword,
    })
    .returning({
      id: users.id,
      name: users.name,
      email: users.email,
    });

  if (!insertedUsers || insertedUsers.length === 0) {
    throw new AppError("Failed to create user", 500);
  }
  return insertedUsers[0];
}
