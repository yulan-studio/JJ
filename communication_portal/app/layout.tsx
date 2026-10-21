import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "我们之间 · JJ",
  description: "只属于你和 JJ 的私密交流空间",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  );
}
