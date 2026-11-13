import type { Metadata } from "next";
import "./globals.css";
import { RestaurantProvider } from "@/context/RestaurantContext";

export const metadata: Metadata = {
  title: "DineFlow — Zero-Commission Digital OS for Local Cafes",
  description:
    "An architectural digital restaurant operating system. Instant QR dine-in ordering, lunch rush pre-orders, and real-time kitchen displays for local eateries.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-[#09090b] text-[#fafafa] selection:bg-amber-500/30 selection:text-amber-200">
        <RestaurantProvider>
          {children}
        </RestaurantProvider>
      </body>
    </html>
  );
}
