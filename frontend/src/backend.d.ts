export declare const backend: {
  createLetter: (
    content: string,
    template: string,
    secretCode: string
  ) => Promise<{ ok: string } | { err: string }>;
  getLetter: (
    id: string,
    secretCode: string
  ) => Promise<
    | { ok: { content: string; template: string; createdAt: bigint } }
    | { err: string }
  >;
};
