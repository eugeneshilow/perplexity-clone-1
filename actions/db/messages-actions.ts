"use server"

import { createMessage, getMessages } from "@/db/queries/messages-queries"
import { InsertMessage, SelectMessage } from "@/db/schema"
import { ActionState } from "@/types"
import { revalidatePath } from "next/cache"

export async function createMessageAction(
  message: InsertMessage
): Promise<ActionState<SelectMessage>> {
  try {
    const newMessage = await createMessage(message)
    revalidatePath("/")
    return {
      isSuccess: true,
      message: "Message created successfully",
      data: newMessage
    }
  } catch (error) {
    return { isSuccess: false, message: "Failed to create message" }
  }
}

export async function getMessagesAction(
  chatId: string
): Promise<ActionState<SelectMessage[]>> {
  try {
    const messages = await getMessages(chatId)
    return {
      isSuccess: true,
      message: "Messages retrieved successfully",
      data: messages
    }
  } catch (error) {
    return { isSuccess: false, message: "Failed to get messages" }
  }
} 