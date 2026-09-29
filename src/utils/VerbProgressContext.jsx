import { createContext, useContext } from 'react';
import { useLocalStorage } from './useLocalStorage.js';
import { shuffle } from './helpers.js';

const DAY = 24 * 60 * 60 * 1000;
// Spaced repetition per verb (Leitner boxes). Wrong → back to box 0 (review now).
// Right when due → next box, so the verb comes back after 1 → 3 → 7 → 14 → 30 days.
const INTERVALS_DAYS = [0, 1, 3, 7, 14, 30];
const MASTERED_BOX = 4;

const VerbProgressContext = createContext(null);

export function VerbProgressProvider({ children }) {
  // { [base]: { box, due, last } }
  const [progress, setProgress] = useLocalStorage('verbProgress', {});

  const record = (base, ok) =>
    setProgress((p) => {
      const now = Date.now();
      const cur = p[base];
      let box = cur?.box ?? 0;
      if (!ok) box = 0;
      // Answering right before the review date doesn't move the verb up — only spaced reviews count.
      else if (!cur || cur.due <= now) box = Math.min(box + 1, INTERVALS_DAYS.length - 1);
      return { ...p, [base]: { box, due: now + INTERVALS_DAYS[box] * DAY, last: ok } };
    });

  const verbStatus = (base) => {
    const p = progress[base];
    if (!p) return 'new';
    if (p.due <= Date.now()) return 'due';
    if (p.box >= MASTERED_BOX) return 'mastered';
    return 'learning';
  };

  // Pick n verbs: due for review first, then new ones, then the rest.
  const pickVerbs = (pool, n) => {
    const due = pool.filter((v) => verbStatus(v.base) === 'due');
    const fresh = pool.filter((v) => verbStatus(v.base) === 'new');
    const rest = pool.filter((v) => !['due', 'new'].includes(verbStatus(v.base)));
    return shuffle([...shuffle(due), ...shuffle(fresh), ...shuffle(rest)].slice(0, n));
  };

  const value = { progress, record, verbStatus, pickVerbs };
  return <VerbProgressContext.Provider value={value}>{children}</VerbProgressContext.Provider>;
}

export const useVerbProgress = () => useContext(VerbProgressContext);
