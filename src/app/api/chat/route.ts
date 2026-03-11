import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"

export const runtime = "edge"

export async function POST() {
  const result = await streamText({
    model: openai("gpt-4o-mini"),
    prompt:
      'You are DocuMind AI, an enterprise RAG shell for PDF intelligence. Respond exactly with: "DocuMind AI is initialized. Ready for PDF ingestion logic." and nothing else.',
  })

  return result.toTextStreamResponse()
}

