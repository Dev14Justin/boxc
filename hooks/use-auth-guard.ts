"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/auth-provider";

export function useAuthGuard(requireAuth = true) {
  const { user, loading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!loading) {
      if (requireAuth && !user) {
        router.push("/auth/login");
      } else if (!requireAuth && user) {
        router.push("/account");
      }
    }
  }, [user, loading, requireAuth, router]);

  return { user, loading };
}
