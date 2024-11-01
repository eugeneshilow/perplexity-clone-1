"use server"

import { db } from "@/db/db"
import { chatsTable } from "@/db/schema"
import { eq } from "drizzle-orm"

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
    return await db.query.chats.findMany({
      where: eq(chatsTable.userId, userId),
      orderBy: chats => [chats.createdAt.desc()]
    })
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
