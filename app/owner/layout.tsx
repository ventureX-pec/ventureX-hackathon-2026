import React from "react"
import OwnerLayout from "@/components/owner/OwnerLayout"

export const metadata = {
  title: "Owner Operations Portal • DineFlow",
  description: "Next-generation restaurant operating system and digital kitchen management.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <OwnerLayout>{children}</OwnerLayout>
}
