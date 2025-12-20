import api from "@/lib/api";
import { LoginRequestDTO, RegisterRequestDTO } from "@/types/dto/auth";

export const login = async (data: LoginRequestDTO) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const register = async (data: RegisterRequestDTO) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};
