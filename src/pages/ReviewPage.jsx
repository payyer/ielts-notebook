import { useMemo, useState } from 'react';
import { lessons, allWords, wordKey } from '../data/index.js';
import { useStarred } from '../utils/StarredContext.jsx';
import VocabList from '../components/VocabList.jsx';
import Flashcards from '../components/Flashcards.jsx';
import VocabQuiz from '../components/VocabQuiz.jsx';

const TABS = { list: '📝 Word list', flashcards: '🃏 Flashcards', quiz: '🎯 Quiz' };

export default function ReviewPage() {
  const { starred } = useStarred();
  const [tab, setTab] = useState('flashcards');
  const [source, setSource] = useState('all'); // 'all' | 'starred' | lessonId

  const words = useMemo(() => {
    if (source === 'all') return allWords;
    if (source === 'starred') return allWords.filter((w) => starred.includes(wordKey(w)));
    return allWords.filter((w) => w.lessonId === source);
    // Only recompute when the source changes, so un-starring doesn't reshuffle the current deck
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [source]);

  return (
    <div>
      <h1>Vocabulary review</h1>
      <div className="toolbar">
        <label>
          Words from:{' '}
          <select className="input small" value={source} onChange={(e) => setSource(e.target.value)}>
            <option value="all">All lessons ({allWords.length} words)</option>
            <option value="starred">★ Difficult words ({starred.length})</option>
            {lessons.map((l) => (
              <option key={l.id} value={l.id}>{l.title}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="tabs">
        {Object.entries(TABS).map(([k, label]) => (
          <button key={k} className={`tab ${tab === k ? 'active' : ''}`} onClick={() => setTab(k)}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'list' && <VocabList words={words} />}
      {tab === 'flashcards' && <Flashcards words={words} />}
      {tab === 'quiz' && <VocabQuiz key={source} words={words} storageKey={`review-${source}`} />}
    </div>
  );
}
