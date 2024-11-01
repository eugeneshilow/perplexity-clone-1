"use server"

import Sidebar from "./_components/sidebar"

interface SearchLayoutProps {
  children: React.ReactNode
}

export default async function SearchLayout({ children }: SearchLayoutProps) {
  return (
    <div className="flex h-[calc(100vh-3.5rem)]">
      <Sidebar className="w-80 border-r" />
      <div className="flex-1">{children}</div>
    </div>
  )
}
