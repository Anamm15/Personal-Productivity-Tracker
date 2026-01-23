import { CreateUser, UserResponseDTO } from "@/types/dto/user";
import { hashPassword } from "@/utils/bcrypt";
import { AppError } from "@/lib/exceptions";
import { createUser, getUserByEmail } from "../../users/repository";

export async function Register(
  name: string,
  email: string,
  password: string,
): Promise<UserResponseDTO> {
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    throw new AppError("Email already registered", 409);
  }

  const hashedPassword = await hashPassword(password);
  const userData: CreateUser = {
    name,
    email,
    password: hashedPassword,
  };

  const insertedUsers = await createUser(userData);
  if (!insertedUsers) {
    throw new AppError("Failed to create user", 500);
  }
  return insertedUsers;
}
