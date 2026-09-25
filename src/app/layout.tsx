import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  icons: { icon: { url: "/gund-supply-logo.webp", type: "image/webp" } },
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
      lang="mn"
      suppressHydrationWarning
      className="h-full scroll-smooth antialiased"
    >
      <body className="flex min-h-full min-w-80 flex-col bg-[#0a1128] font-sans text-[#f7f9ff] in-data-[theme=light]:bg-[#f4f7fb] in-data-[theme=light]:text-[#0a1128]">{children}</body>
    </html>
  );
}
