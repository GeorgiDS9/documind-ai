import { OpenAIEmbeddings } from "@langchain/openai"

type SessionId = string

type SessionStore = {
  chunks: string[]
  vectors: number[][]
  rawText: string
}

const sessionStores = new Map<SessionId, SessionStore>()

const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-small",
})

function chunkText(
  text: string,
  chunkSize = 1000,
  chunkOverlap = 200,
): string[] {
  const normalized = text.replace(/\s+/g, " ").trim()
  const chunks: string[] = []

  if (!normalized) return chunks

  let start = 0
  while (start < normalized.length) {
    const end = start + chunkSize
    const slice = normalized.slice(start, end)
    chunks.push(slice)

    if (end >= normalized.length) break
    start = end - chunkOverlap
  }

  return chunks
}

function cosineSimilarity(a: number[], b: number[]): number {
  const len = Math.min(a.length, b.length)
  let dot = 0
  let normA = 0
  let normB = 0

  for (let i = 0; i < len; i++) {
    dot += a[i] * b[i]
    normA += a[i] * a[i]
    normB += b[i] * b[i]
  }

  if (!normA || !normB) return 0
  return dot / (Math.sqrt(normA) * Math.sqrt(normB))
}

export async function ingestPdfForSession(buffer: Buffer, sessionId: SessionId) {
  const pdfModule = await import("pdf-parse")
  // pdf-parse may export the parser as a default or named export depending on build.
  const pdfParse =
    (pdfModule as { default?: (data: Buffer) => Promise<{ text: string }> })
      .default ??
    ((pdfModule as unknown) as (data: Buffer) => Promise<{ text: string }>)

  const parsed = await pdfParse(buffer)
  const text = parsed.text || ""

  if (!text.trim()) {
    throw new Error("No extractable text found in PDF.")
  }

  const chunks = chunkText(text, 1000, 200)
  const vectors = await embeddings.embedDocuments(chunks)

  sessionStores.set(sessionId, {
    chunks,
    vectors,
    rawText: text,
  })
}

export async function retrieveRelevantChunks(
  sessionId: SessionId,
  query: string,
  k = 3,
): Promise<string[]> {
  const store = sessionStores.get(sessionId)
  if (!store) {
    return []
  }

  const queryVector = await embeddings.embedQuery(query)

  const scored = store.chunks.map((chunk, index) => ({
    chunk,
    score: cosineSimilarity(queryVector, store.vectors[index]),
  }))

  scored.sort((a, b) => b.score - a.score)

  return scored
    .slice(0, k)
    .filter((item) => item.score > 0)
    .map((item) => item.chunk)
}

