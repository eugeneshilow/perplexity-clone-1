"use server"

import { Suspense } from "react"
import { auth } from "@clerk/nextjs/server"
import { getChatsAction } from "@/actions/db/chats-actions"
import Sidebar from "./_components/sidebar"
import SidebarSkeleton from "./_components/sidebar-skeleton"

export default async function SearchLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen">
      <Suspense fallback={<SidebarSkeleton />}>
        <SidebarFetcher />
      </Suspense>

      <div className="flex-1">{children}</div>
    </div>
  )
}

async function SidebarFetcher() {
  const { userId } = auth()
  const { data: chats } = await getChatsAction(userId!)

  return <Sidebar initialChats={chats || []} />
}
