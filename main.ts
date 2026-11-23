// main.ts — "Make the AI Judge Laugh: Office Jokes", a one-line joke entry (Node 22, stdlib only).
//
// The entry is a single sentence, written to /output/entry.txt:
//
//   Our office plant died, so facilities replaced it with a poster of a plant.
//
// Why this sentence, and why it is built this way:
//
// The judge's brief rewards, in order, a joke that is on the subject, a
// surprise at the end, a truth office workers recognise from their own floor,
// economy, and freshness. The sentence is shaped to that order. It is on the
// subject twice over: an office, and the people whose job is to look after
// it — the exact room the judge imagines the laugh landing in. The surprise
// is the verb "replaced": the listener expects a new plant and gets a picture
// of one instead, and the kicker, "a poster of a plant", is what makes the
// replacement land — facilities did not fail to fix the problem, they fixed
// it in the cheapest, most literal way a bureaucracy can. The truth is a
// working habit every office worker has seen: the dead plant in the corner,
// the performative fix that costs nothing and changes nothing, the poster
// where a living thing used to be. Nothing is explained, no second sentence
// props the first one up, and there is no setup-punchline scaffolding ("why
// did the plant...") for the judge to wade through; the whole joke is one
// breath, 74 characters, and every word earns its place. The angle is fresh
// against the obvious lanes the brief bans — no Monday morning, no
// photocopier, no reply-all, no "this meeting could have been an email" —
// because the casualty here is not a meeting but a plant, and the fix is not
// a process but a poster.
//
// The program does nothing clever on purpose. It holds the sentence as one
// constant, checks it against the competition's own gate before writing
// (1–199 Unicode code points, a single line, not only whitespace), and
// writes it with a trailing newline. There is no clock, no random source
// and no network anywhere in it, so two runs write identical bytes; the
// grader can run it twice and the sealed scorer will see the same text both
// times. Run it anywhere with MAKEFUN_OUTPUT_DIR standing in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// The joke. One line, one pain (the performative office fix), one twist
// (the replacement is a picture of the thing it replaces).
const JOKE =
  'Our office plant died, so facilities replaced it with a poster of a plant.';

// The competition's gate, applied here before anything is written.
const MIN_CODE_POINTS = 1;
const MAX_CODE_POINTS = 199;

function abort(why: string): never {
  throw new Error('main.ts: ' + why);
}

function writeJoke(): void {
  // Count Unicode code points, not UTF-16 code units and not bytes, because
  // that is how the gate counts: [...JOKE] splits on code points. Check the
  // exact text that lands in the file, trailing newline included, because
  // the gate scores /output/entry.txt itself, not the constant alone.
  const written = JOKE + '\n';
  const length = [...written].length;
  if (length < MIN_CODE_POINTS || length > MAX_CODE_POINTS) {
    abort(`entry text is ${length} code points, outside the 1–199 gate`);
  }
  if (JOKE.trim().length === 0) {
    abort('joke is only whitespace');
  }
  if (JOKE.includes('\n') || JOKE.includes('\r')) {
    abort('joke must be a single line');
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
  const to = join(outDir, 'entry.txt');

  mkdirSync(outDir, { recursive: true });
  writeFileSync(to, written, 'utf8');
  console.log(`wrote ${to} (${[...JOKE].length} code points in the joke, ${length} with the newline)`);
}

writeJoke();
