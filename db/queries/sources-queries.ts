"use server"

import { db } from "@/db/db"
import { InsertSource, sourcesTable } from "@/db/schema"
import { eq, desc } from "drizzle-orm"

export const createSource = async (source: InsertSource) => {
  try {
    const [newSource] = await db.insert(sourcesTable).values(source).returning()
    return newSource
  } catch (error) {
    console.error("Error creating source:", error)
    throw new Error("Failed to create source")
  }
}

export const getSources = async (chatId: string) => {
  try {
    return await db.query.sources.findMany({
      where: eq(sourcesTable.chatId, chatId),
      orderBy: sources => [desc(sources.createdAt)]
    })
  } catch (error) {
    console.error("Error getting sources:", error)
    throw new Error("Failed to get sources")
  }
}
