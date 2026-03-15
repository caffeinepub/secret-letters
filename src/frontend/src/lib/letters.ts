export type TemplateId =
  | "parchment"
  | "floral"
  | "midnight"
  | "typewriter"
  | "minimal";

export interface Letter {
  id: string;
  content: string;
  template: TemplateId;
  secretCode: string;
  createdAt: number;
}

const STORAGE_KEY = "secret_letters";

function getLetters(): Record<string, Letter> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveLetters(letters: Record<string, Letter>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(letters));
}

function generateId(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let id = "";
  for (let i = 0; i < 8; i++) {
    if (i === 4) id += "-";
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}

export function createLetter(
  content: string,
  template: TemplateId,
  secretCode: string,
): { ok: string } | { err: string } {
  if (!content.trim()) return { err: "Letter content cannot be empty." };
  if (!secretCode.trim()) return { err: "Secret code cannot be empty." };

  const letters = getLetters();
  const id = generateId();
  letters[id] = { id, content, template, secretCode, createdAt: Date.now() };
  saveLetters(letters);
  return { ok: id };
}

export function getLetter(
  id: string,
  secretCode: string,
):
  | { ok: { content: string; template: TemplateId; createdAt: number } }
  | { err: string } {
  const letters = getLetters();
  const letter = letters[id.toUpperCase()];
  if (!letter) return { err: "No letter found with that ID." };
  if (letter.secretCode !== secretCode)
    return { err: "Incorrect secret code." };
  return {
    ok: {
      content: letter.content,
      template: letter.template,
      createdAt: letter.createdAt,
    },
  };
}
