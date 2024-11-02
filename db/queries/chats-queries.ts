"use server"

import { db } from "@/db/db"
import { chatsTable } from "@/db/schema"
import { eq, desc } from "drizzle-orm"

export const createChat = async (userId: string, name: string) => {
  try {
    const [chat] = await db
      .insert(chatsTable)
      .values({ userId, name })
      .returning()
    return chat
  } catch (error) {
    console.error("Error creating chat:", error)
    throw new Error("Failed to create chat")
  }
}

export const getChats = async (userId: string) => {
  try {
    return await db
      .select()
      .from(chatsTable)
      .where(eq(chatsTable.userId, userId))
      .orderBy(desc(chatsTable.createdAt))
  } catch (error) {
    console.error("Error getting chats:", error)
    throw new Error("Failed to get chats")
  }
}

export const deleteChat = async (id: string) => {
  try {
    const [chat] = await db
      .delete(chatsTable)
      .where(eq(chatsTable.id, id))
      .returning()
    return chat
  } catch (error) {
    console.error("Error deleting chat:", error)
    throw new Error("Failed to delete chat")
  }
}

export const getChatById = async (chatId: string) => {
  try {
    const [chat] = await db
      .select()
      .from(chatsTable)
      .where(eq(chatsTable.id, chatId))
    return chat
  } catch (error) {
    console.error("Error getting chat:", error)
    throw new Error("Failed to get chat")
  }
}

export const getChat = async (id: string) => {
  try {
    const [chat] = await db
      .select()
      .from(chatsTable)
      .where(eq(chatsTable.id, id))
      .limit(1)
    return chat
  } catch (error) {
    console.error("Error getting chat:", error)
    throw new Error("Failed to get chat")
  }
}
