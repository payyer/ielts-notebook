// Validates all lesson data. Usage: npm run check
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { isCorrect } from '../src/utils/helpers.js';

const QUESTIONS_PER_TOPIC = 50;
const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), '../src/data/lessons');
const errors = [];
const warn = [];
const lessonIds = new Set();

for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.js')).sort()) {
  const lesson = (await import(pathToFileURL(path.join(dir, file)).href)).default;
  const where = `${file}`;
  if (!lesson.id || !lesson.title) errors.push(`${where}: missing id or title`);
  if (lessonIds.has(lesson.id)) errors.push(`${where}: duplicate lesson id "${lesson.id}"`);
  lessonIds.add(lesson.id);

  const words = lesson.vocabulary ?? [];
  words.forEach((w, i) => {
    if (!w.word || !w.meaning) errors.push(`${where}: word #${i + 1} missing word or meaning`);
  });
  const dupWords = words.map((w) => w.word).filter((w, i, a) => a.indexOf(w) !== i);
  if (dupWords.length) errors.push(`${where}: duplicate words: ${dupWords.join(', ')}`);

  const topicIds = new Set();
  const summary = [];
  for (const g of lesson.grammar ?? []) {
    const t = `${where} › ${g.title}`;
    if (!g.id) errors.push(`${t}: missing stable id`);
    if (topicIds.has(g.id)) errors.push(`${t}: duplicate topic id`);
    topicIds.add(g.id);

    const qs = g.exercises ?? [];
    if (qs.length !== QUESTIONS_PER_TOPIC) warn.push(`${t}: ${qs.length} questions (expected ${QUESTIONS_PER_TOPIC})`);
    const dupQ = qs.map((q) => q.question).filter((q, i, a) => a.indexOf(q) !== i);
    if (dupQ.length) errors.push(`${t}: duplicate questions: ${dupQ.join(' | ')}`);

    const types = {};
    qs.forEach((q, i) => {
      const type = q.options ? 'mcq' : q.type ?? 'fill';
      types[type] = (types[type] ?? 0) + 1;
      const qi = `${t} #${i + 1}`;
      if (!q.question || q.answer == null || q.answer === '') errors.push(`${qi}: missing question or answer`);
      if (q.options && q.options.filter((o) => isCorrect(o, q.answer)).length !== 1)
        errors.push(`${qi}: MCQ must have exactly one correct option — "${q.question}"`);
      if (type === 'fill' && !q.question.includes('___')) errors.push(`${qi}: fill question has no ___ blank`);
      if (!['mcq', 'fill', 'correction', 'rewrite'].includes(type)) errors.push(`${qi}: unknown type "${type}"`);
    });
    summary.push(`${g.title}: ${qs.length} (${Object.entries(types).map(([k, v]) => `${k} ${v}`).join(', ')})`);
  }
  console.log(`✓ ${lesson.id} — ${words.length} words — ${summary.join(' · ') || 'no grammar'}`);
}

warn.forEach((w) => console.log(`⚠ ${w}`));
errors.forEach((e) => console.log(`✗ ${e}`));
if (errors.length) process.exit(1);
console.log(`\nAll good: ${lessonIds.size} lessons.`);
