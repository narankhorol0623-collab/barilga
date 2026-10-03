"use client";

import { useRouter } from "next/navigation";
import LoginPage from "../LoginPage";

export default function Page() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/admin");
  };

  return (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-background z-50">
      <LoginPage onLogin={handleLogin} />
    </div>
  );
}
