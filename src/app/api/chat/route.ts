import { NextResponse } from "next/server"
import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"

import { retrieveRelevantChunks } from "@/lib/ai/rag-engine"

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      messages?: { role: string; content: string }[]
      sessionId?: string
    }

    const messages = body.messages ?? []
    const sessionId = body.sessionId ?? "default-session"

    const lastUserMessage = [...messages].reverse().find((m) => m.role === "user")
    const query = lastUserMessage?.content?.trim()

    if (!query) {
      return NextResponse.json(
        { error: "A user message is required." },
        { status: 400 },
      )
    }

    const contextChunks = await retrieveRelevantChunks(sessionId, query, 3)

    console.log("Retrieved Chunks", {
      sessionId,
      query,
      chunks: contextChunks,
    })

    const context =
      contextChunks.length > 0
        ? contextChunks.join("\n\n---\n\n")
        : "No context available from the current session."

    const result = await streamText({
      model: openai("gpt-4o-mini"),
      messages: [
        {
          role: "system",
          content:
            "You are a professional assistant. Answer the user's question based ONLY on the following context. " +
            "If the answer isn't there, say you don't know.\n\n" +
            context,
        },
        ...messages.map((message) => ({
          role: message.role as "user" | "assistant",
          content: message.content,
        })),
      ],
    })

    return result.toTextStreamResponse()
  } catch (error) {
    console.error("Chat route error", error)
    return NextResponse.json(
      {
        error:
          "DocuMind AI encountered an issue generating a response. Please try again or reduce the document size.",
      },
      { status: 500 },
    )
  }
}

