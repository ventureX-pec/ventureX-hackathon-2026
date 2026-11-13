import type { Metadata } from "next";
import "./globals.css";
import { RestaurantProvider } from "@/context/RestaurantContext";

export const metadata: Metadata = {
  title: "DineFlow — Simple, Modern Operations for Independent Restaurants",
  description:
    "From QR-based table ordering to real-time kitchen coordination, manage your entire restaurant workflow on one elegant platform.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-[#FAF8F3] text-[#252522] selection:bg-[#D66B43]/15 selection:text-[#D66B43]">
        <RestaurantProvider>
          {children}
        </RestaurantProvider>
      </body>
    </html>
  );
}
