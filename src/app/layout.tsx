import type { Metadata } from "next";
import "./globals.css";
import "./brand.css";
import "./landing-refresh.css";

export const metadata: Metadata = {
  title: "Гүнд Саплай — Ирээдүйн бүтээн байгуулалт",
  description:
    "Монголын архитектурын шинэ өнгө төрхийг тодорхойлох үл хөдлөх хөрөнгийн портал.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
