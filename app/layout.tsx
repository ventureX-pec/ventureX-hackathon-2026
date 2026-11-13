import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DineFlowProvider } from "@/context/DineFlowContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DineFlow | Multi-Restaurant Digital Ordering & Operating System",
  description: "Next-generation digital dining platform connecting independent culinary kitchens with seamless mobile ordering, smart kitchen workload balancing, and live order tracking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#faf7f2] text-[#1c1917] flex flex-col antialiased selection:bg-[#c96342]/20 selection:text-[#c96342]">
        <DineFlowProvider>
          {children}
        </DineFlowProvider>
      </body>
    </html>
  );
}
