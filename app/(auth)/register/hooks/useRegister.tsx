import { useState } from "react";
import { register as registerService } from "@/services/auth";
import { RegisterRequestDTO } from "@/types/dto/auth";
import { toast } from "sonner";

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null);

  const register = async (payload: RegisterRequestDTO) => {
    setIsLoading(true);
    setError(null);
    const toastId = toast.loading("Processing registration...");

    try {
      const response = await registerService(payload);
      toast.success(`Welcome, ${response.data.user?.name || "User"}!`, {
        id: toastId,
        duration: 2000,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "An error occurred while registering";
      setError(message);
      toast.error(message, {
        id: toastId,
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading };
};
