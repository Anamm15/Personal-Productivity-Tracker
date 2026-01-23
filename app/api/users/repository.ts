import { users } from "@/database/schema/user";
import { db } from "@/lib/db";
import { CreateUser } from "@/types/dto/user";
import { eq } from "drizzle-orm";

export async function getUserById(userId: string) {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);
  return user[0];
}

export async function getUserByEmail(email: string) {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  return user[0];
}

export async function createUser(data: CreateUser) {
  const insertedUsers = await db.insert(users).values(data).returning({
    id: users.id,
    name: users.name,
    email: users.email,
  });
  return insertedUsers[0];
}
