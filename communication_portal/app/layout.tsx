import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Between Us · JJ",
  description: "A private space for mom and JJ",
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
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
