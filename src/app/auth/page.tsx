"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const returnTo = searchParams.get("returnTo") || "/";

  useEffect(() => {
    // simulate login success
    const timer = setTimeout(() => {
      // ✅ after login, go back to the original page
      router.push(returnTo);
    }, 1000); // simulate delay

    return () => clearTimeout(timer);
  }, [returnTo, router]);

  return (
    <div>
      <h1>Login Successful</h1>
      <p>Redirecting to: {returnTo}</p>
    </div>
  );
}
