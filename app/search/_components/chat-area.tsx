"use client"

import { Search } from "lucide-react"
import { SelectChat, SelectMessage } from "@/db/schema"

interface ChatAreaProps {
  chat: SelectChat
  initialMessages: SelectMessage[]
  userId: string
}

export default function ChatArea({
  chat,
  initialMessages,
  userId
}: ChatAreaProps) {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="w-full max-w-2xl space-y-8 p-4">
        <h1 className="animate-gradient-x bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text pb-1 text-center text-5xl font-extrabold tracking-tight text-transparent drop-shadow-lg">
          Ask anything
        </h1>

        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-lg border px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute right-3 top-1/2 size-5 -translate-y-1/2 text-gray-400" />
        </div>
      </div>
    </div>
  )
}
