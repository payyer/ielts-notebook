export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function normalize(s) {
  return String(s)
    .toLowerCase()
    .replace(/[’‘`]/g, "'")
    // treat contractions and full forms the same: doesn't = does not, I'm = I am ...
    .replace(/\bcan't\b/g, 'cannot')
    .replace(/\bwon't\b/g, 'will not')
    .replace(/n't\b/g, ' not')
    .replace(/'m\b/g, ' am')
    .replace(/'re\b/g, ' are')
    .replace(/'ve\b/g, ' have')
    .replace(/,/g, ' ') // commas don't matter
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\s*[.!?]+$/, ''); // ignore final punctuation in full-sentence answers
}

export function isCorrect(input, answer) {
  const accepted = Array.isArray(answer) ? answer : [answer];
  return accepted.some((a) => normalize(a) === normalize(input));
}

export function firstAnswer(answer) {
  return Array.isArray(answer) ? answer[0] : answer;
}

export function timeAgo(ts) {
  if (!ts) return 'never';
  const days = Math.floor((Date.now() - ts) / 86400000);
  if (days <= 0) return 'today';
  if (days === 1) return 'yesterday';
  return `${days} days ago`;
}

export function timeUntil(ts) {
  if (!ts) return '';
  const days = Math.ceil((ts - Date.now()) / 86400000);
  if (days <= 0) return 'now';
  if (days === 1) return 'tomorrow';
  return `in ${days} days`;
}
