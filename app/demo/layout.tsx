import type React from "react"
import { DemoHeader } from "@/components/demo-header"

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <DemoHeader />
      <main className="flex-1 container mx-auto py-6">{children}</main>
    </div>
  )
}
