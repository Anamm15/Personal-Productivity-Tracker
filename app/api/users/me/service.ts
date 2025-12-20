import { users } from "@/database/schema/user";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";

export async function me(userId: string) {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);
  return user[0];
}
