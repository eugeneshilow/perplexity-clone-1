"use server"

import { db } from "@/db/db"
import { messagesTable } from "@/db/schema"
import { eq } from "drizzle-orm"

export const getMessages = async (chatId: string) => {
  try {
    return db.query.messages.findMany({
      where: eq(messagesTable.chatId, chatId),
      orderBy: messages => messages.createdAt
    })
  } catch (error) {
    console.error("Error getting messages:", error)
    throw new Error("Failed to get messages")
  }
}
