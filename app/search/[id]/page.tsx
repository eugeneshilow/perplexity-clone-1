"use server"

import { Suspense } from "react"
import { auth } from "@clerk/nextjs/server"
import { getMessagesAction } from "@/actions/db/messages-actions"
import { getChatAction } from "@/actions/db/chats-actions"
import ChatArea from "../_components/chat-area"
import ChatAreaSkeleton from "../_components/chat-area-skeleton"

export default async function ChatPage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<ChatAreaSkeleton />}>
      <ChatFetcher id={params.id} />
    </Suspense>
  )
}

async function ChatFetcher({ id }: { id: string }) {
  const { userId } = auth()
  const [chatResponse, messagesResponse] = await Promise.all([
    getChatAction(id),
    getMessagesAction(id)
  ])

  if (!chatResponse.isSuccess || !chatResponse.data) {
    throw new Error("Chat not found")
  }

  if (!messagesResponse.isSuccess) {
    throw new Error("Failed to load messages")
  }

  return (
    <ChatArea
      chat={chatResponse.data}
      initialMessages={messagesResponse.data || []}
      userId={userId!}
    />
  )
}
