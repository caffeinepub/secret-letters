import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getLetter } from "@/lib/letters";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Feather, Loader2, Lock } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export default function UnlockPage() {
  const navigate = useNavigate();
  const [letterId, setLetterId] = useState("");
  const [secretCode, setSecretCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleUnlock() {
    if (!letterId.trim() || !secretCode.trim()) {
      setError("Please enter both the letter ID and secret code.");
      return;
    }
    setIsLoading(true);
    setError(null);
    await new Promise((r) => setTimeout(r, 500));
    const result = getLetter(letterId.trim().toUpperCase(), secretCode);
    setIsLoading(false);
    if ("err" in result) {
      setError(result.err);
    } else {
      sessionStorage.setItem(
        `letter_${letterId.trim().toUpperCase()}`,
        JSON.stringify(result.ok),
      );
      navigate({ to: `/read/${letterId.trim().toUpperCase()}` });
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
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
            Open a Letter
          </span>
        </div>
        <div className="w-16" />
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-md"
        >
          {/* Decorative */}
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">🔐</div>
            <h1 className="font-playfair text-3xl text-foreground mb-2">
              Unlock a Letter
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Enter the letter ID and the secret code shared with you
            </p>
          </div>

          <div className="bg-card border border-border rounded-sm p-8 space-y-6">
            <div>
              <Label
                htmlFor="letter-id"
                className="text-sm font-medium text-foreground mb-2 block"
              >
                Letter ID
              </Label>
              <Input
                id="letter-id"
                data-ocid="unlock.id_input"
                value={letterId}
                onChange={(e) => {
                  setLetterId(e.target.value);
                  setError(null);
                }}
                placeholder="e.g. ABCD-1234"
                className="bg-background border-border text-foreground font-mono tracking-widest uppercase"
                onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
              />
            </div>

            <div>
              <Label
                htmlFor="secret-code-unlock"
                className="flex items-center gap-2 text-sm font-medium text-foreground mb-2"
              >
                <Lock className="w-3 h-3" /> Secret Code
              </Label>
              <Input
                id="secret-code-unlock"
                data-ocid="unlock.code_input"
                type="password"
                value={secretCode}
                onChange={(e) => {
                  setSecretCode(e.target.value);
                  setError(null);
                }}
                placeholder="Enter the secret code…"
                className="bg-background border-border text-foreground"
                onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                data-ocid="unlock.error_state"
                className="text-sm text-destructive-foreground bg-destructive/20 border border-destructive/40 rounded-sm px-4 py-3"
              >
                {error}
              </motion.div>
            )}

            <Button
              data-ocid="unlock.submit_button"
              onClick={handleUnlock}
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground rounded-none py-6 text-sm tracking-widest uppercase"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" /> Unlocking…
                </>
              ) : (
                "Open Letter"
              )}
            </Button>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            Don't have a letter yet?{" "}
            <Link
              to="/compose"
              className="underline hover:text-foreground transition-colors"
            >
              Write one
            </Link>
          </p>
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
