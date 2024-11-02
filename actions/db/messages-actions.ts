"use server"

import { getMessages } from "@/db/queries/messages-queries"
import { SelectMessage } from "@/db/schema"
import { ActionState } from "@/types"

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
    console.error("Error getting messages:", error)
    return { isSuccess: false, message: "Failed to get messages" }
  }
} 