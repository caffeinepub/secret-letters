import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Feather, Lock, PenLine } from "lucide-react";
import { motion } from "motion/react";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-letters-bg.dim_1600x900.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-background/70" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 md:px-12 py-6">
        <div className="flex items-center gap-2">
          <Feather className="w-5 h-5 gold-text" />
          <span className="font-playfair text-lg gold-text tracking-widest uppercase text-sm">
            Secret Letters
          </span>
        </div>
        <nav className="flex items-center gap-4">
          <Link to="/compose">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground text-xs tracking-widest uppercase"
            >
              Write
            </Button>
          </Link>
          <Link to="/open">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground text-xs tracking-widest uppercase"
            >
              Open
            </Button>
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="max-w-3xl mx-auto"
        >
          {/* Decorative line */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold" />
            <Feather className="w-4 h-4 gold-text" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold" />
          </div>

          <h1 className="font-playfair text-5xl md:text-7xl font-bold leading-tight mb-4 text-foreground">
            Write letters only the
            <br />
            <em className="gold-text glow-gold italic">right heart</em> can open
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl mt-6 mb-10 font-light leading-relaxed max-w-xl mx-auto">
            Seal your words in beauty. Choose an aesthetic template, set a
            secret code, and share something meant only for one.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/compose">
              <Button
                size="lg"
                data-ocid="landing.write_button"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base font-medium tracking-wide gap-2 rounded-none"
              >
                <PenLine className="w-4 h-4" />
                Write a Letter
              </Button>
            </Link>
            <Link to="/open">
              <Button
                size="lg"
                variant="outline"
                data-ocid="landing.open_button"
                className="border-border text-foreground hover:bg-muted px-8 py-6 text-base font-medium tracking-wide gap-2 rounded-none"
              >
                <Lock className="w-4 h-4" />
                Open a Letter
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Feature row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          {[
            {
              icon: "✒️",
              title: "5 Aesthetic Templates",
              desc: "Parchment, Floral, Midnight, Typewriter, Minimal",
            },
            {
              icon: "🔐",
              title: "Secret Code Protected",
              desc: "Only those who know the code can read your letter",
            },
            {
              icon: "🕯️",
              title: "Intimate & Private",
              desc: "No accounts, no tracking — just your words",
            },
          ].map((f) => (
            <div key={f.title} className="text-center">
              <div className="text-2xl mb-2">{f.icon}</div>
              <div className="font-playfair text-sm font-semibold text-foreground mb-1">
                {f.title}
              </div>
              <div className="text-xs text-muted-foreground leading-relaxed">
                {f.desc}
              </div>
            </div>
          ))}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-4 text-xs text-muted-foreground">
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
