import { Button } from "@/components/ui/button";
import type { TemplateId } from "@/lib/letters";
import { getTemplate } from "@/lib/templates";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Feather } from "lucide-react";
import { motion } from "motion/react";

interface LetterData {
  content: string;
  template: TemplateId;
  createdAt: number;
}

export default function ReadPage() {
  const { id } = useParams({ from: "/read/$id" });

  let letter: LetterData | null = null;
  try {
    const raw = sessionStorage.getItem(`letter_${id}`);
    if (raw) letter = JSON.parse(raw);
  } catch {
    letter = null;
  }

  const template = letter ? getTemplate(letter.template) : null;

  if (!letter || !template) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center px-4">
        <div className="text-4xl mb-4">🔒</div>
        <h2 className="font-playfair text-2xl text-foreground mb-2">
          Letter Not Found
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          This letter hasn't been unlocked yet, or the session has expired.
        </p>
        <Link to="/open">
          <Button className="bg-primary text-primary-foreground rounded-none">
            Try Unlocking Again
          </Button>
        </Link>
      </div>
    );
  }

  const date = new Date(letter.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border px-6 md:px-12 py-5 flex items-center justify-between">
        <Link to="/open">
          <button
            type="button"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </button>
        </Link>
        <div className="flex items-center gap-2">
          <Feather className="w-4 h-4 gold-text" />
          <span className="font-playfair text-sm gold-text tracking-widest uppercase">
            Your Letter
          </span>
        </div>
        <div className="w-16" />
      </header>

      <main className="flex-1 flex items-start justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-2xl"
        >
          {/* Template badge */}
          <div className="flex items-center gap-2 mb-6 justify-center">
            <span className="text-base">{template.symbol}</span>
            <span className="text-xs text-muted-foreground uppercase tracking-widest">
              {template.name} Template
            </span>
          </div>

          {/* The Letter */}
          <article
            data-ocid="read.letter_panel"
            className={`${template.bodyClass} relative grain-overlay rounded-sm p-10 md:p-14 shadow-2xl`}
          >
            {/* Decorative top border */}
            <div className="text-center text-xl mb-6 opacity-40">
              {template.symbol}
            </div>

            {/* Date */}
            <p className="text-xs opacity-50 uppercase tracking-widest mb-8 text-center">
              {date}
            </p>

            {/* Content */}
            <div className="whitespace-pre-wrap text-base leading-[1.9] min-h-[200px]">
              {letter.content}
            </div>

            {/* Bottom decoration */}
            <div className="text-center mt-10 opacity-30 text-lg">
              {template.symbol}
            </div>
          </article>

          {/* Actions */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Link to="/compose">
              <Button
                variant="outline"
                className="rounded-none border-border text-sm"
              >
                Write a Reply
              </Button>
            </Link>
            <Link to="/">
              <Button
                variant="ghost"
                className="rounded-none text-sm text-muted-foreground"
              >
                Go Home
              </Button>
            </Link>
          </div>
        </motion.div>
      </main>

      <footer className="text-center py-4 text-xs text-muted-foreground">
        © {new Date().getFullYear()}. Built with love using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-foreground transition-colors"
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
