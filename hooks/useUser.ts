import { getUser } from "@/services/user";
import { UserResponseDTO } from "@/types/dto/user";
import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
  return useQuery<UserResponseDTO | null>({
    queryKey: ["user"],
    queryFn: getUser,
    staleTime: 7 * 24 * 60 * 60 * 1000,
  });
};
