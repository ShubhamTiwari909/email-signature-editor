import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"],variable: "--font-sans", });

export const metadata: Metadata = {
  title: "Email signature generator tool",
  description: "Email signature generator tool for all brands",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="mt-20">{children}</main>
      </body>
    </html>
  );
}
