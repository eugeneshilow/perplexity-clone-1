"use server"

import { createChat, deleteChat, getChats, getChat } from "@/db/queries/chats-queries"
import { SelectChat } from "@/db/schema"
import { ActionState } from "@/types"
import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs/server"

export async function createChatAction(
  name: string
): Promise<ActionState<SelectChat>> {
  try {
    const { userId } = auth()

    if (!userId) {
      return { isSuccess: false, message: "User not authenticated" }
    }

    const newChat = await createChat(userId, name)
    revalidatePath("/")
    return {
      isSuccess: true,
      message: "Chat created successfully",
      data: newChat
    }
  } catch (error) {
    console.error("Error creating chat:", error)
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

export async function getChatAction(id: string): Promise<ActionState<SelectChat>> {
  try {
    const chat = await getChat(id)
    
    if (!chat) {
      return {
        isSuccess: false,
        message: "Chat not found"
      }
    }

    return {
      isSuccess: true,
      message: "Chat retrieved successfully",
      data: chat
    }
  } catch (error) {
    console.error("Error getting chat:", error)
    return { isSuccess: false, message: "Failed to get chat" }
  }
} 