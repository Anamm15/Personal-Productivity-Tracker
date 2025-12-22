import api from "@/lib/api";

export const getUser = async () => {
  const response = await api.get("/users/me");
  return response.data.data;
};
