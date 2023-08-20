import "./globals.css";
import type { Metadata } from "next";

import { Inter } from "next/font/google";

import OpenAIChatBot from "./components/OpenAIChatBot";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Open AI Chat Bot",
  description: "Collapsable chat bot built with Open AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <OpenAIChatBot />
        {children}
      </body>
    </html>
  );
}
