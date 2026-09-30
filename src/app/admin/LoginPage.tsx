"use client";

import { useState } from "react";

interface LoginPageProps {
  onLogin: () => void;
}

const VALID_CREDENTIALS = {
  email: "administor@gundsupply.mn",
  password: "admin123",
};

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Дахин илгээх бүрд алдааг цэвэрлэнэ

    if (
      email.trim() === VALID_CREDENTIALS.email &&
      password === VALID_CREDENTIALS.password
    ) {
      onLogin();
    } else {
      setError("И-мэйл эсвэл нууц үг буруу байна!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background relative overflow-hidden p-4 sm:p-6 w-full">
      <div className="w-full max-w-[560px] p-6 sm:p-10 space-y-5 sm:space-y-6 bg-card rounded-2xl border border-white/80 relative z-10">
        <div className="text-center space-y-1.5 sm:space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            ГҮНД САПЛАЙ — УДИРДЛАГА
          </h1>
          <p className="text-base leading-6 text-muted-foreground">
            Админ системд нэвтрэхийн тулд мэдээллээ оруулна уу
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-base font-medium text-foreground">
              И-мэйл
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Компаний И-мэйл хаягаа оруулна уу?"
              className="w-full px-5 py-4 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground text-base transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="text-base font-medium text-foreground">
              Нууц үг
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Нууц үгээ оруулна уу?"
              className="w-full px-5 py-4 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground text-base transition-all"
            />
          </div>

          <div className="flex items-center justify-between text-base gap-2">
            <label className="flex items-center space-x-2 cursor-pointer text-muted-foreground select-none">
              <input
                type="checkbox"
                className="h-5 w-5 rounded border-border accent-primary"
              />
              <span className="text-base">Намайг санах</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 bg-primary text-black font-medium text-base rounded-lg hover:opacity-90 active:scale-[0.99] transition-all duration-200"
          >
            Нэвтрэх
          </button>
        </form>
      </div>
    </div>
  );
}
