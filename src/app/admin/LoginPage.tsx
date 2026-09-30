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
    <div className="admin-login-screen w-full">
      <section className="admin-login-card">
        <div>
          <h1 className="admin-login-heading">ГҮНД САПЛАЙ — УДИРДЛАГА</h1>
          <p className="admin-login-description">
            Админ системд нэвтрэхийн тулд мэдээллээ оруулна уу
          </p>
        </div>

        {error && (
          <div
            className="mb-4 rounded-lg border border-red-400/30 bg-red-500/10 p-3 text-center text-sm font-medium text-red-300"
            role="alert"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="admin-login-field">
            <label htmlFor="admin-email" className="admin-login-label">
              И-мэйл
            </label>
            <input
              id="admin-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Компаний И-мэйл хаягаа оруулна уу?"
              className="admin-login-input"
            />
          </div>

          <div className="admin-login-field">
            <label htmlFor="admin-password" className="admin-login-label">
              Нууц үг
            </label>
            <input
              id="admin-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Нууц үгээ оруулна уу?"
              className="admin-login-input"
            />
          </div>

          <div className="flex items-center justify-between gap-2">
            <label className="admin-login-remember select-none">
              <input type="checkbox" className="rounded" />
              <span>Намайг санах</span>
            </label>
          </div>

          <button type="submit" className="admin-login-submit w-full">
            Нэвтрэх
          </button>
        </form>
      </section>
    </div>
  );
}
