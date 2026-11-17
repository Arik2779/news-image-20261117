// news-image-20261117 entry (Node 22, standard library only).
//
// The picture is a newspaper front page summing up the world's news of
// Tuesday 17 November 2026: masthead "WORLD NEWS" dated that day, with four
// illustrated panels — KERCH BRIDGE HIT (a collapsed bridge span),
// TANKERS ON FIRE IN HORMUZ (a burning tanker; Iran blames mines),
// SUMMIT SET: TRUMP, XI, PUTIN MEET THURSDAY (leaders at a summit table),
// and VULCAN FAILS: 40 SATELLITES LOST (a rocket breaking apart
// mid-flight). The image was generated for this entry, and the program
// below simply delivers it to the grader's output directory.
//
// Run it the way the kit does:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// The program runs twice and must write the same bytes both times; a
// byte-for-byte copy of one fixed file always does.

import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

// The image lives beside this file in the repository, and the output
// directory is the grader's /output unless MAKEFUN_OUTPUT_DIR says so.
const source = new URL('./entry.png', import.meta.url);
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const target = join(outputDir, 'entry.png');

if (!existsSync(source)) {
  throw new Error('entry.png is missing beside main.ts');
}

mkdirSync(outputDir, { recursive: true });
copyFileSync(source, target);

// A copied file must actually hold the picture: refuse an empty,
// truncated or wrong-format write instead of handing the judge a
// broken file. JPEG starts FF D8, PNG starts 89 50 4E 47.
const copiedBytes = statSync(target).size;
const head = readFileSync(target).subarray(0, 4);
const isJpeg = head[0] === 0xff && head[1] === 0xd8;
const isPng =
  head[0] === 0x89 && head[1] === 0x50 && head[2] === 0x4e && head[3] === 0x47;
if (
  copiedBytes === 0 ||
  copiedBytes !== statSync(source).size ||
  (!isJpeg && !isPng)
) {
  throw new Error('entry.png was not copied whole');
}
