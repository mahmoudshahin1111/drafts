import type { Metadata } from "next";
import { Manrope, Sora, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import AppHeader from "../components/app-header";
import { ScrollArea } from "@/components/ui/scroll-area";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Drafts",
  description:
    "Drafts is a simple notes app for capturing, organizing, and reviewing ideas.",
  keywords: ["notes", "drafts", "writing", "ideas", "productivity"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${sora.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="h-dvh w-dvw p-0 m-0 flex flex-col text-lg leading-7 overflow-y-auto overflow-x-hidden">
        <Toaster />
        <AppHeader />
        <main className="w-full flex flex-col">
         {children}
        </main>
      </body>
    </html>
  );
}
