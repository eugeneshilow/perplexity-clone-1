"use client"

import { SelectChat } from "@/db/schema"
import { createChatAction } from "@/actions/db/chats-actions"
import { Button } from "@/components/ui/button"
import { Plus, MessageSquare, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useParams } from "next/navigation"
import { deleteChatAction } from "@/actions/db/chats-actions"

interface SidebarProps {
  initialChats: SelectChat[]
}

export default function Sidebar({ initialChats }: SidebarProps) {
  const router = useRouter()
  const params = useParams()
  const currentChatId = params?.id as string

  const handleNewChat = async () => {
    const result = await createChatAction("New Chat")

    if (result.isSuccess && result.data) {
      router.push(`/search/${result.data.id}`)
    }
  }

  const handleDeleteChat = async (e: React.MouseEvent, chatId: string) => {
    e.preventDefault()
    const result = await deleteChatAction(chatId)

    if (result.isSuccess) {
      if (currentChatId === chatId) {
        router.push("/search")
      } else {
        router.refresh()
      }
    }
  }

  return (
    <div className="border-border bg-muted/10 flex h-full w-80 flex-col border-r p-4">
      <Button
        onClick={handleNewChat}
        className="mb-4 w-full"
        variant="secondary"
      >
        <Plus className="mr-2 size-4" />
        New Search
      </Button>

      <div className="flex-1 space-y-2 overflow-y-auto">
        {initialChats.map(chat => (
          <Link key={chat.id} href={`/search/${chat.id}`}>
            <div
              className={cn(
                "hover:bg-muted/50 group flex items-center justify-between rounded-lg p-3 transition-colors",
                currentChatId === chat.id && "bg-muted/50"
              )}
            >
              <div className="flex items-center space-x-2">
                <MessageSquare className="size-4" />
                <span className="truncate text-sm">{chat.name}</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="size-8 opacity-0 transition-opacity group-hover:opacity-100"
                onClick={e => handleDeleteChat(e, chat.id)}
              >
                <Trash2 className="text-muted-foreground hover:text-destructive size-4" />
              </Button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
