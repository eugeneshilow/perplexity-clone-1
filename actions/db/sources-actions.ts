"use server"

import { createSource, getSources } from "@/db/queries/sources-queries"
import { InsertSource, SelectSource } from "@/db/schema"
import { ActionState } from "@/types"
import { revalidatePath } from "next/cache"

export async function createSourceAction(
  source: InsertSource
): Promise<ActionState<SelectSource>> {
  try {
    const newSource = await createSource(source)
    revalidatePath("/")
    return {
      isSuccess: true,
      message: "Source created successfully",
      data: newSource
    }
  } catch (error) {
    return { isSuccess: false, message: "Failed to create source" }
  }
}

export async function getSourcesAction(
  chatId: string
): Promise<ActionState<SelectSource[]>> {
  try {
    const sources = await getSources(chatId)
    return {
      isSuccess: true,
      message: "Sources retrieved successfully",
      data: sources
    }
  } catch (error) {
    return { isSuccess: false, message: "Failed to get sources" }
  }
} 