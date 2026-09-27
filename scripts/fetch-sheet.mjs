// Reads LIST tabs from the teacher's Google Sheet and prints them as JSON.
// Usage: npm run sheet -- 4        (one list)
//        npm run sheet -- 4 5 6    (several)
//        npm run sheet             (scan LIST 1.. until a tab is missing — prints a summary)
const SHEET_ID = '1rH0Q_ztqDhj3Eqb1GpZiK7v88rTwYLSe9i96AK_2bDU';
const GRAMMAR_COL = 11; // column L

const url = (n) =>
  `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(`LIST ${n}`)}`;

function parseCsv(text) {
  const rows = [];
  let row = [], cell = '', quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (c === '"') quoted = false;
      else cell += c;
    } else if (c === '"') quoted = true;
    else if (c === ',') { row.push(cell); cell = ''; }
    else if (c === '\n') { row.push(cell); rows.push(row); row = []; cell = ''; }
    else if (c !== '\r') cell += c;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  return rows;
}

async function fetchList(n) {
  const res = await fetch(url(n));
  if (!res.ok) throw new Error(`HTTP ${res.status} for LIST ${n}`);
  const rows = parseCsv(await res.text());
  const label = (rows[1]?.[0] ?? '').trim();
  // A missing tab name silently returns another tab ("MIDTERM & FINAL"), so check the label.
  if (!/^LIST \d+/i.test(label)) return null;

  const vocabulary = rows.slice(2)
    .filter((r) => r[0]?.trim())
    .map((r) => {
      const [word, ...rest] = r[0].split('\n');
      const example = rest.join(' ').replace(/^\s*Ex:\s*/i, '').trim();
      return { word: word.trim(), meaning: (r[1] ?? '').trim(), ...(example && { example }) };
    });

  // Grammar cells in column L alternate: title, then content (FORM / USE / SIGNAL WORDS).
  const cells = rows.slice(1).map((r) => (r[GRAMMAR_COL] ?? '').trim()).filter(Boolean);
  const grammar = [];
  for (let i = 0; i < cells.length; i += 2) grammar.push({ title: cells[i], content: cells[i + 1] ?? '' });

  return { list: n, label, vocabCount: vocabulary.length, vocabulary, grammar };
}

const args = process.argv.slice(2).map(Number).filter(Boolean);
if (args.length) {
  for (const n of args) {
    const data = await fetchList(n);
    console.log(data ? JSON.stringify(data, null, 2) : `LIST ${n}: not found`);
  }
} else {
  for (let n = 1; ; n++) {
    const data = await fetchList(n);
    if (!data) break;
    console.log(`LIST ${n}: "${data.label}" — ${data.vocabCount} words — grammar: ${data.grammar.map((g) => g.title).join(' | ')}`);
  }
}
