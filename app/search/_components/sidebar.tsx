"use client"

import { cn } from "@/lib/utils"

interface SidebarProps {
  className?: string
}

export default async function Sidebar({ className }: SidebarProps) {
  return (
    <div className={cn("bg-background p-4", className)}>
      <div className="space-y-4">
        <div className="text-lg font-semibold">Recent Searches</div>
        {/* Search history will go here */}
      </div>
    </div>
  )
}
