"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/auth/me")
      .then(() => {
        setLoading(false);

        if ("serviceWorker" in navigator) {
          navigator.serviceWorker.register("/sw.js");
        }
      })
      .catch(() => router.replace("/login"));
  }, [router]);

  if (loading) return null;

  return <>{children}</>;
}
