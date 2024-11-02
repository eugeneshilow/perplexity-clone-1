"use client"

export default function SidebarSkeleton() {
  return (
    <div className="border-border bg-muted/10 w-80 border-r p-4">
      <div className="space-y-4">
        <div className="bg-muted h-10 w-full animate-pulse rounded-md" />
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="bg-muted h-12 w-full animate-pulse rounded-md"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
