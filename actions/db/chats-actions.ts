"use server"

import { createChat, deleteChat, getChats } from "@/db/queries/chats-queries"
import { InsertChat, SelectChat } from "@/db/schema"
import { ActionState } from "@/types"
import { revalidatePath } from "next/cache"

export async function createChatAction(
  chat: InsertChat
): Promise<ActionState<SelectChat>> {
  try {
    const newChat = await createChat(chat)
    revalidatePath("/")
    return {
      isSuccess: true,
      message: "Chat created successfully",
      data: newChat
    }
  } catch (error) {
    return { isSuccess: false, message: "Failed to create chat" }
  }
}

export async function getChatsAction(
  userId: string
): Promise<ActionState<SelectChat[]>> {
  try {
    const chats = await getChats(userId)
    return {
      isSuccess: true,
      message: "Chats retrieved successfully",
      data: chats
    }
  } catch (error) {
    return { isSuccess: false, message: "Failed to get chats" }
  }
}

export async function deleteChatAction(
  chatId: string
): Promise<ActionState<SelectChat>> {
  try {
    const chat = await deleteChat(chatId)
    revalidatePath("/")
    return {
      isSuccess: true,
      message: "Chat deleted successfully",
      data: chat
    }
  } catch (error) {
    return { isSuccess: false, message: "Failed to delete chat" }
  }
} 