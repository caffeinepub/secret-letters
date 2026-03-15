import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createLetter } from "@/lib/letters";
import type { TemplateId } from "@/lib/letters";
import { TEMPLATES } from "@/lib/templates";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Check, Copy, Feather, Loader2, Lock } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

export default function ComposePage() {
  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplateId>("parchment");
  const [content, setContent] = useState("");
  const [secretCode, setSecretCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdId, setCreatedId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const selectedConfig = TEMPLATES.find((t) => t.id === selectedTemplate)!;

  async function handleSubmit() {
    if (!content.trim()) {
      toast.error("Please write something first.");
      return;
    }
    if (!secretCode.trim()) {
      toast.error("Please set a secret code.");
      return;
    }
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    const result = createLetter(content, selectedTemplate, secretCode);
    setIsSubmitting(false);
    if ("err" in result) {
      toast.error(result.err);
    } else {
      setCreatedId(result.ok);
    }
  }

  async function handleCopy() {
    if (!createdId) return;
    await navigator.clipboard.writeText(createdId);
    setCopied(true);
    toast.success("Letter ID copied!");
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border px-6 md:px-12 py-5 flex items-center justify-between">
        <Link to="/">
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
            Compose
          </span>
        </div>
        <div className="w-16" />
      </header>

      <main className="max-w-5xl mx-auto px-4 md:px-8 py-10">
        {/* Template picker */}
        <section className="mb-10">
          <h2 className="font-playfair text-xl text-foreground mb-1">
            Choose a Template
          </h2>
          <p className="text-xs text-muted-foreground mb-5 tracking-wide">
            Select the aesthetic for your letter
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {TEMPLATES.map((tpl, idx) => (
              <button
                type="button"
                key={tpl.id}
                data-ocid={`compose.template.item.${idx + 1}`}
                onClick={() => setSelectedTemplate(tpl.id)}
                className={`relative rounded-sm p-3 text-left transition-all border-2 ${
                  selectedTemplate === tpl.id
                    ? "border-primary shadow-lg scale-105"
                    : "border-transparent hover:border-border"
                }`}
              >
                <div
                  className={`${tpl.previewClass} rounded-sm p-3 mb-2 min-h-[80px] flex flex-col justify-between text-xs overflow-hidden`}
                >
                  <div className="font-bold opacity-70 text-[10px] uppercase tracking-widest">
                    {tpl.symbol}
                  </div>
                  <div className="leading-snug text-[9px] opacity-60 mt-1">
                    Dear friend, I write to you in the quiet hours…
                  </div>
                </div>
                <div className="text-xs font-medium text-foreground">
                  {tpl.name}
                </div>
                <div className="text-[10px] text-muted-foreground">
                  {tpl.description}
                </div>
                {selectedTemplate === tpl.id && (
                  <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary" />
                )}
              </button>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Writing area */}
          <section>
            <Label
              htmlFor="letter-content"
              className="font-playfair text-xl text-foreground block mb-1"
            >
              Your Letter
            </Label>
            <p className="text-xs text-muted-foreground mb-4">
              Write freely — only the right person will read this
            </p>
            <Textarea
              id="letter-content"
              data-ocid="compose.textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Dear…\n\nI've been meaning to tell you something for a long time now…"
              className="min-h-[320px] bg-card border-border text-foreground resize-none font-light leading-relaxed text-base"
            />
          </section>

          {/* Preview + code */}
          <section className="flex flex-col gap-6">
            {/* Live preview */}
            <div>
              <p className="text-xs text-muted-foreground mb-3 uppercase tracking-widest">
                Preview
              </p>
              <div
                className={`${selectedConfig.bodyClass} rounded-sm p-6 min-h-[200px] text-sm leading-relaxed whitespace-pre-wrap overflow-hidden relative grain-overlay`}
              >
                {content || (
                  <span className="opacity-40 italic">
                    Your letter will appear here…
                  </span>
                )}
                {/* Decorative corner */}
                <div className="absolute bottom-3 right-4 text-lg opacity-20">
                  {selectedConfig.symbol}
                </div>
              </div>
            </div>

            {/* Secret code */}
            <div>
              <Label
                htmlFor="secret-code"
                className="flex items-center gap-2 text-sm font-medium text-foreground mb-2"
              >
                <Lock className="w-3 h-3" /> Secret Code
              </Label>
              <p className="text-xs text-muted-foreground mb-3">
                Only someone with this code can open your letter
              </p>
              <Input
                id="secret-code"
                data-ocid="compose.code_input"
                type="password"
                value={secretCode}
                onChange={(e) => setSecretCode(e.target.value)}
                placeholder="Enter a secret code…"
                className="bg-card border-border text-foreground"
              />
            </div>

            <Button
              data-ocid="compose.submit_button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-primary text-primary-foreground rounded-none py-6 text-sm tracking-widest uppercase font-medium"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" /> Sealing…
                </>
              ) : (
                <>Seal & Send ✉️</>
              )}
            </Button>
          </section>
        </div>
      </main>

      {/* Success modal */}
      <AnimatePresence>
        {createdId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              data-ocid="compose.letter_id.success_state"
              className="bg-card border border-border rounded-sm max-w-md w-full p-8 text-center shadow-2xl"
            >
              <div className="text-3xl mb-4">✉️</div>
              <h3 className="font-playfair text-2xl text-foreground mb-2">
                Your letter is sealed
              </h3>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Share this ID with your recipient. They'll need it along with
                your secret code to open the letter.
              </p>

              {/* Letter ID display */}
              <div className="bg-muted/30 border border-border rounded-sm p-4 mb-4 flex items-center justify-between gap-3">
                <span className="font-mono text-xl font-bold text-foreground tracking-widest flex-1">
                  {createdId}
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  data-ocid="compose.copy_button"
                  onClick={handleCopy}
                  className="shrink-0"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-primary" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>

              <p className="text-xs text-muted-foreground mb-6 italic">
                Don't forget your secret code — it cannot be recovered.
              </p>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 rounded-none border-border"
                  onClick={() => {
                    setCreatedId(null);
                    setContent("");
                    setSecretCode("");
                  }}
                >
                  Write Another
                </Button>
                <Link to="/open" className="flex-1">
                  <Button className="w-full bg-primary text-primary-foreground rounded-none">
                    Open a Letter
                  </Button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="text-center py-6 text-xs text-muted-foreground">
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
