import { getUserById } from "@/app/api/users/repository";

export async function me(userId: string) {
  const user = await getUserById(userId);
  return user;
}
