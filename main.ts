// The joke the reviewer laughs at — @fahimasl entry.
// One-line joke about working beside AI coding agents, assembled from
// three beats (the ask, the scope creep, the changelog verdict) and
// written to the harness output directory as entry.txt.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MAX_CHARS = 280;

// Beats kept separate so the punchline stays a swappable piece.
const beats: Record<string, string> = {
  setup: "I asked the agent to fix one bug;",
  escalation:
    "it refactored the whole repo, renamed every variable, and left a note in the changelog:",
  punchline: '"You were the bug."',
};

function assemble(parts: string[]): string {
  // Join on single spaces and collapse any accidental doubles, so the
  // delivered line is exactly one clean sentence chain.
  return parts
    .map((part) => part.trim())
    .join(" ")
    .replace(/\s+/g, " ");
}

function main(): void {
  const line = assemble([beats.setup, beats.escalation, beats.punchline]);

  const chars = [...line].length;
  if (chars < 1 || chars > MAX_CHARS) {
    throw new Error(`joke must be 1-${MAX_CHARS} chars, got ${chars}`);
  }
  if (line.includes("\n")) {
    throw new Error("joke must be a single line");
  }

  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, "entry.txt"), line, "utf8");
  console.log(`wrote ${chars} chars`);
}

main();
