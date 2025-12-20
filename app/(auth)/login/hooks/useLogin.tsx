import { useState } from "react";
import { useRouter } from "next/navigation";
import { login as loginService } from "@/services/auth";
import { LoginRequestDTO } from "@/types/dto/auth";
import { toast } from "sonner";

export const useLogin = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null);

  const login = async (payload: LoginRequestDTO) => {
    setIsLoading(true);
    setError(null);
    const toastId = toast.loading("Verifying Account...");

    try {
      const response = await loginService(payload);
      if (response.data.token) {
        toast.success(`Welcome, ${response.data.user?.name || "User"}!`, {
          id: toastId,
          duration: 4000,
        });
        localStorage.setItem("token", response.data.token);
      }
      router.push("/dashboard");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "An error occurred while logging in.";
      setError(message);
      toast.error(message, {
        id: toastId,
        duration: 5000,
      });
      console.error("Login Gagal:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    isLoading,
  };
};
