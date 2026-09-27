import { createContext, useContext } from 'react';
import { useLocalStorage } from './useLocalStorage.js';
import { shuffle } from './helpers.js';

const DAY = 24 * 60 * 60 * 1000;
// Spaced repetition (Leitner boxes): the better you do, the longer until the next review.
const INTERVALS_DAYS = [0, 1, 3, 7, 14, 30];
const HISTORY_SIZE = 20; // mastery = % correct over the last N answers
const STREAK_TO_CLEAR = 2; // a mistake leaves the notebook after N correct answers in a row

const GrammarProgressContext = createContext(null);

export function GrammarProgressProvider({ children }) {
  // { [topicKey]: { history: bool[], box, due, lastPracticed } }
  const [progress, setProgress] = useLocalStorage('grammarProgress', {});
  // { [qKey]: { streak, addedAt } }
  const [mistakes, setMistakes] = useLocalStorage('grammarMistakes', {});
  // { [qKey]: true/false } — result of the last attempt at each question
  const [answered, setAnswered] = useLocalStorage('grammarAnswered', {});

  // Pick n questions: last-time-wrong first, then never seen, then the rest.
  const pickQuestions = (pool, n) => {
    const wrong = pool.filter((q) => answered[q.qKey] === false);
    const unseen = pool.filter((q) => !(q.qKey in answered));
    const right = pool.filter((q) => answered[q.qKey] === true);
    return shuffle([...shuffle(wrong), ...shuffle(unseen), ...shuffle(right)].slice(0, n));
  };

  const recordAnswer = (q, ok) => {
    setAnswered((a) => ({ ...a, [q.qKey]: ok }));
    setProgress((p) => {
      const t = p[q.topicKey] ?? { box: 0, history: [] };
      return {
        ...p,
        [q.topicKey]: { ...t, history: [...t.history, ok].slice(-HISTORY_SIZE), lastPracticed: Date.now() },
      };
    });
    setMistakes((m) => {
      const cur = m[q.qKey];
      if (!ok) return { ...m, [q.qKey]: { streak: 0, addedAt: cur?.addedAt ?? Date.now() } };
      if (!cur) return m;
      if (cur.streak + 1 >= STREAK_TO_CLEAR) {
        const { [q.qKey]: _removed, ...rest } = m;
        return rest;
      }
      return { ...m, [q.qKey]: { ...cur, streak: cur.streak + 1 } };
    });
  };

  // results: { [topicKey]: { correct, total } } — moves each topic to its next Leitner box
  const finishSession = (results) => {
    setProgress((p) => {
      const next = { ...p };
      for (const [key, { correct, total }] of Object.entries(results)) {
        const t = next[key] ?? { box: 0, history: [] };
        const pct = correct / total;
        let box = t.box ?? 0;
        if (pct >= 0.8) box = Math.min(box + 1, INTERVALS_DAYS.length - 1);
        else if (pct < 0.5) box = 0;
        next[key] = { ...t, box, due: Date.now() + INTERVALS_DAYS[box] * DAY };
      }
      return next;
    });
  };

  const topicStats = (key) => {
    const t = progress[key];
    if (!t || t.history.length === 0) return { status: 'new', mastery: null };
    const mastery = Math.round((t.history.filter(Boolean).length / t.history.length) * 100);
    let status = 'learning';
    if (t.due != null && t.due <= Date.now()) status = 'due';
    else if (t.box >= 4 && mastery >= 85) status = 'mastered';
    return { status, mastery, lastPracticed: t.lastPracticed, due: t.due, box: t.box };
  };

  const value = { progress, mistakes, answered, pickQuestions, recordAnswer, finishSession, topicStats };
  return <GrammarProgressContext.Provider value={value}>{children}</GrammarProgressContext.Provider>;
}

export const useGrammarProgress = () => useContext(GrammarProgressContext);
