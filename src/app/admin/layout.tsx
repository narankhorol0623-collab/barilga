import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ГҮНД САПЛАЙ — УДИРДЛАГА",
  description: "ГҮНД САПЛАЙ удирдлагын самбар",
  icons: {
    icon: "/good-supply-logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
        rel="stylesheet"
        precedence="default"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500&display=swap"
        rel="stylesheet"
        precedence="default"
      />
      <div className="dark flex h-screen overflow-hidden bg-surface text-on-surface font-body-md text-body-md custom-scrollbar">
        {children}
      </div>
    </>
  );
}
