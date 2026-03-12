import { NextResponse } from "next/server"
import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"

import { retrieveRelevantChunks } from "@/lib/ai/rag-engine"

type ChatRequestBody = {
  prompt?: string
  sessionId?: string
}

export async function POST(request: Request) {
  let body: ChatRequestBody

  try {
    body = (await request.json()) as ChatRequestBody
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    )
  }

  const prompt = body.prompt?.trim()
  const sessionId = body.sessionId ?? "default-session"

  if (!prompt) {
    return NextResponse.json(
      { error: "Prompt is required." },
      { status: 400 },
    )
  }

  const contextChunks = await retrieveRelevantChunks(sessionId, prompt, 3)

  // For verification of semantic search during development.
  console.log("Retrieved Chunks", {
    sessionId,
    query: prompt,
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
      {
        role: "user",
        content: prompt,
      },
    ],
  })

  return result.toTextStreamResponse()
}

