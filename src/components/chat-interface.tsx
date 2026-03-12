"use client"

import { useCompletion } from "@ai-sdk/react"
import { ArrowUpRight, Sparkles } from "lucide-react"

import { useSessionId } from "@/hooks/use-session-id"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export function ChatInterface() {
  const sessionId = useSessionId()
  const {
    completion,
    input,
    isLoading,
    handleInputChange,
    handleSubmit,
    error,
  } = useCompletion({
    api: "/api/chat",
    body: sessionId ? { sessionId } : undefined,
  })

  return (
    <Card className="flex h-full min-h-[420px] flex-col border-white/15 bg-slate-950/40 p-3 backdrop-blur-2xl">
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-slate-900/80 px-3 py-2 text-xs text-slate-200 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="inline-flex size-6 items-center justify-center rounded-full bg-violet-500/20 text-violet-200 ring-1 ring-violet-400/50">
            <Sparkles className="size-3.5" />
          </div>
          <div className="flex flex-col">
            <span className="font-medium">DocuMind AI</span>
            <span className="text-[10px] text-slate-400">
              Ask anything about your PDFs once ingestion is connected.
            </span>
          </div>
        </div>
      </div>

      <div className="mt-3 flex-1 max-h-[420px] rounded-2xl border border-white/10 bg-slate-950/60 px-3 py-2">
        <div className="flex h-full flex-col gap-2 overflow-y-auto pb-1 pt-0">
          {!completion && (
            <div className="mt-4 space-y-2 rounded-2xl bg-slate-900/80 p-3 text-xs text-slate-300 ring-1 ring-white/10">
              <p className="font-medium text-slate-100">
                You&apos;re connected to the DocuMind RAG shell.
              </p>
              <p>
                The current response is mocked. In the next steps we&apos;ll wire in
                PDF embeddings, semantic retrieval, and grounded generation.
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-4 text-[11px] text-slate-400">
                <li>“Summarize the key risks in our latest vendor contract.”</li>
                <li>
                  “Compare Q3 vs Q4 performance from the attached financial report.”
                </li>
                <li>“What are the core findings from this research PDF?”</li>
              </ul>
            </div>
          )}

          {completion && (
            <div className="flex justify-start">
              <div className="inline-flex max-w-[85%] items-start gap-2 rounded-2xl bg-slate-900/80 px-3 py-2 text-xs text-slate-50 shadow-sm ring-1 ring-white/10">
                <div className="mt-[1px]">
                  <div className="inline-flex size-5 items-center justify-center rounded-full bg-violet-500/20 text-violet-200 ring-1 ring-violet-400/40">
                    <Sparkles className="size-3" />
                  </div>
                </div>
                <p className="whitespace-pre-wrap text-[11px] leading-relaxed md:text-xs">
                  {completion}
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-2 rounded-2xl bg-destructive/15 px-3 py-2 text-[11px] text-destructive ring-1 ring-destructive/40">
              <p>There was an issue talking to the chat endpoint.</p>
            </div>
          )}
        </div>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault()
          if (!input.trim()) return
          // Delegate to the hook's submit handler so streaming still works.
          ;(handleSubmit as (event?: { preventDefault?: () => void }) => void)()
        }}
        className="mt-3 flex items-center gap-2 rounded-2xl border border-white/15 bg-slate-950/70 p-2 text-xs shadow-inner shadow-slate-950/60"
      >
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask a question about your PDFs…"
          className="h-9 border-none bg-transparent text-xs text-slate-100 placeholder:text-slate-500 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <Button
          type="submit"
          size="icon-sm"
          className="shrink-0 rounded-xl bg-sky-500/90 text-slate-950 shadow-lg shadow-sky-500/40 hover:bg-sky-400"
          disabled={isLoading || !input.trim()}
        >
          <ArrowUpRight className="size-3.5" />
        </Button>
      </form>
    </Card>
  )
}

