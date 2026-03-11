import { CloudUpload, FileText, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function PDFUploader() {
  return (
    <div className="space-y-4">
      <Card className="relative overflow-hidden border-white/15 bg-slate-950/30 p-4 backdrop-blur-2xl shadow-inner shadow-slate-950/60">
        <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-sky-500/15 blur-3xl" />

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/70 px-2.5 py-1 text-[11px] font-medium text-slate-200 ring-1 ring-white/10">
              <CloudUpload className="size-3 text-sky-300" />
              <span>PDF ingestion pipeline</span>
            </div>
            <p className="text-sm text-slate-200/90">
              Upload compliance decks, research PDFs, or contracts. We&apos;ll slice
              them into semantic chunks and prep them for RAG.
            </p>
            <p className="text-[11px] text-slate-400">
              Parsing, chunking, and vectorization will be wired in the next step.
            </p>
          </div>

          <div className="flex flex-col items-start gap-2 md:items-end">
            <Button
              type="button"
              size="sm"
              className="gap-2 bg-sky-500/90 text-slate-950 shadow-lg shadow-sky-500/40 hover:bg-sky-400"
              disabled
            >
              <FileText className="size-3.5" />
              <span>Upload PDF (soon)</span>
            </Button>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-900/80 px-2 py-1 text-[10px] text-slate-300 ring-1 ring-white/10">
              <Sparkles className="size-3 text-violet-300" />
              <span>RAG-ready ingestion pipeline</span>
            </div>
          </div>
        </div>
      </Card>

      <Card className="border-white/10 bg-slate-950/40 p-3 backdrop-blur-2xl">
        <div className="flex items-center justify-between gap-3">
          <div className="space-y-1">
            <p className="text-xs font-medium text-slate-200/90">
              Recent workspaces
            </p>
            <p className="text-[11px] text-slate-400">
              Once ingestion is live, your latest PDF collections will appear here.
            </p>
          </div>
          <div className="flex gap-1.5">
            <span className="inline-flex items-center rounded-full bg-slate-900/80 px-2 py-0.5 text-[10px] text-slate-300 ring-1 ring-white/10">
              0 indexed
            </span>
            <span className="inline-flex items-center rounded-full bg-slate-900/80 px-2 py-0.5 text-[10px] text-slate-300 ring-1 ring-white/10">
              Embeddings pending
            </span>
          </div>
        </div>
      </Card>
    </div>
  )
}

