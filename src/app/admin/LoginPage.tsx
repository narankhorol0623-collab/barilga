"use client";

import { useState } from "react";

interface LoginPageProps {
  onLogin: () => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setPending(true);
    try {
      const response = await fetch("/admin/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Нэвтрэхэд алдаа гарлаа.");
      onLogin();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Нэвтрэхэд алдаа гарлаа.");
    } finally {
      setPending(false);
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
              autoComplete="username"
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
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Нууц үгээ оруулна уу?"
              className="admin-login-input"
            />
          </div>

          <button type="submit" disabled={pending} className="admin-login-submit w-full disabled:opacity-60">
            {pending ? "Нэвтэрч байна…" : "Нэвтрэх"}
          </button>
        </form>
      </section>
    </div>
  );
}
