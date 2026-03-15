import type { TemplateId } from "./letters";

export interface TemplateConfig {
  id: TemplateId;
  name: string;
  description: string;
  previewClass: string;
  bodyClass: string;
  accent: string;
  symbol: string;
}

export const TEMPLATES: TemplateConfig[] = [
  {
    id: "parchment",
    name: "Parchment",
    description: "Aged paper, sepia tones",
    previewClass: "template-parchment",
    bodyClass: "template-parchment",
    accent: "#8B6914",
    symbol: "📜",
  },
  {
    id: "floral",
    name: "Floral",
    description: "Soft pinks & lavender",
    previewClass: "template-floral",
    bodyClass: "template-floral",
    accent: "#B45C8F",
    symbol: "🌸",
  },
  {
    id: "midnight",
    name: "Midnight",
    description: "Deep navy, golden ink",
    previewClass: "template-midnight",
    bodyClass: "template-midnight",
    accent: "#C9A84C",
    symbol: "🌙",
  },
  {
    id: "typewriter",
    name: "Typewriter",
    description: "Vintage monospace",
    previewClass: "template-typewriter",
    bodyClass: "template-typewriter",
    accent: "#4A3728",
    symbol: "⌨️",
  },
  {
    id: "minimal",
    name: "Minimal Ink",
    description: "Clean, literary",
    previewClass: "template-minimal",
    bodyClass: "template-minimal",
    accent: "#111111",
    symbol: "✒️",
  },
];

export function getTemplate(id: TemplateId): TemplateConfig {
  return TEMPLATES.find((t) => t.id === id) ?? TEMPLATES[0];
}
