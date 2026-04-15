import Link from "next/link";
import {
  Brain,
  FileText,
  Search,
  Shield,
  Zap,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    iconColor: "text-sky-300",
    iconBg: "bg-sky-500/15 ring-sky-500/40",
    title: "Semantic PDF Ingestion",
    description:
      "Upload any PDF. Text is extracted, split into 1,000-character chunks with 200-character overlap, and embedded via OpenAI for precision semantic retrieval.",
    badge: "text-embedding-3-small",
    badgeColor: "text-sky-300",
    badgeBg: "bg-sky-500/10 ring-sky-500/20",
  },
  {
    icon: Search,
    iconColor: "text-violet-300",
    iconBg: "bg-violet-500/15 ring-violet-500/40",
    title: "Evidence-First Answers",
    description:
      "Every response is grounded in your document content. Clickable source pills expose the exact chunks backing each answer — no hallucination, no guesswork.",
    badge: "Top-3 cosine retrieval",
    badgeColor: "text-violet-300",
    badgeBg: "bg-violet-500/10 ring-violet-500/20",
  },
  {
    icon: Zap,
    iconColor: "text-amber-300",
    iconBg: "bg-amber-500/15 ring-amber-500/40",
    title: "Real-Time Streaming",
    description:
      "Answers stream token-by-token from GPT-4o-mini the moment retrieval completes — optimised for serverless execution with no perceptible wait.",
    badge: "gpt-4o-mini · RAG",
    badgeColor: "text-amber-300",
    badgeBg: "bg-amber-500/10 ring-amber-500/20",
  },
  {
    icon: Shield,
    iconColor: "text-emerald-300",
    iconBg: "bg-emerald-500/15 ring-emerald-500/40",
    title: "Session-Scoped Privacy",
    description:
      "Your documents never leave the session. All vectors live in memory and are discarded when the session ends — nothing is written to a persistent database.",
    badge: "In-memory · No persistence",
    badgeColor: "text-emerald-300",
    badgeBg: "bg-emerald-500/10 ring-emerald-500/20",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#1e293b,transparent_55%),radial-gradient(circle_at_bottom,#020617,#020617)] text-foreground">
      {/* Ambient glows */}
      <div className="pointer-events-none fixed inset-0 opacity-60 mix-blend-screen">
        <div className="absolute -left-40 top-10 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-sky-600/10 blur-3xl" />
      </div>

      <main className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col px-4 py-14 md:py-20">
        {/* Nav bar */}
        <nav className="mb-16 flex items-center justify-between">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium shadow-sm backdrop-blur-xl">
            <span className="inline-flex size-6 items-center justify-center rounded-full bg-sky-500/15 text-sky-300 ring-1 ring-sky-500/40">
              <Brain className="size-3.5" />
            </span>
            <span className="text-sky-100/80">DocuMind AI</span>
          </div>

          <Link
            href="/workspace"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-slate-200 shadow-sm backdrop-blur-xl transition hover:border-sky-400/40 hover:text-sky-200"
          >
            Open workspace
            <ArrowRight className="size-3" />
          </Link>
        </nav>

        {/* Hero */}
        <section className="mb-20 flex flex-col items-center text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/60 px-3.5 py-1.5 text-[11px] font-medium text-slate-300 shadow-sm ring-1 ring-white/10">
            <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_0_3px_rgba(34,197,94,0.35)]" />
            RAG-native · GPT-4o-mini · Session-isolated
          </div>

          <h1 className="max-w-3xl text-balance text-4xl font-semibold tracking-tight text-slate-50 md:text-5xl lg:text-6xl">
            Turn static PDFs into{" "}
            <span className="bg-linear-to-r from-sky-300 to-violet-300 bg-clip-text text-transparent">
              live, grounded intelligence.
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-balance text-sm text-slate-300/80 md:text-base">
            DocuMind AI ingests your documents, embeds them semantically, and
            answers your questions with evidence — not guesses. Every response
            cites its source.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/workspace"
              className="inline-flex items-center gap-2 rounded-xl bg-sky-500/90 px-5 py-2.5 text-sm font-medium text-slate-950 shadow-lg shadow-sky-500/30 ring-1 ring-sky-400/60 transition hover:bg-sky-400"
            >
              Start with your PDF
              <ArrowRight className="size-3.5" />
            </Link>
            <span className="text-xs text-slate-500">No sign-up required</span>
          </div>
        </section>

        {/* Feature cards */}
        <section>
          <div className="mb-8 text-center">
            <p className="text-xs font-medium uppercase tracking-widest text-slate-500">
              How it works
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {features.map(({ icon: Icon, ...feat }) => (
              <div
                key={feat.title}
                className="relative flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_0_0_1px_rgba(148,163,184,0.1),0_8px_40px_rgba(15,23,42,0.7)] backdrop-blur-2xl transition hover:border-white/20"
              >
                {/* Icon */}
                <div
                  className={`inline-flex size-9 items-center justify-center rounded-xl ring-1 ${feat.iconBg}`}
                >
                  <Icon className={`size-4 ${feat.iconColor}`} />
                </div>

                <div className="flex flex-col gap-1">
                  <h2 className="text-sm font-semibold text-slate-100">
                    {feat.title}
                  </h2>
                  <p className="text-[12px] leading-relaxed text-slate-400">
                    {feat.description}
                  </p>
                </div>

                {/* Badge */}
                <div
                  className={`mt-auto inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-[10px] font-medium ring-1 ${feat.badgeBg} ${feat.badgeColor}`}
                >
                  {feat.badge}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 flex items-center justify-center gap-2 text-[11px] text-slate-600">
          <Brain className="size-3" />
          <span>DocuMind AI — RAG-native PDF intelligence</span>
        </footer>
      </main>
    </div>
  );
}
