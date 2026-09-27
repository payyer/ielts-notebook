import { useState } from 'react';
import { shuffle, isCorrect } from '../utils/helpers.js';
import { speak } from '../utils/speak.js';
import { useLocalStorage } from '../utils/useLocalStorage.js';
import SpeakButton from './SpeakButton.jsx';

const MODES = {
  meaning: 'Word → choose the meaning',
  word: 'Meaning → choose the word',
  typing: 'Meaning → type the word',
  listen: 'Listen → type the word (dictation)',
};

function buildQuestions(words, mode, count) {
  return shuffle(words).slice(0, count).map((w) => {
    if (mode === 'typing' || mode === 'listen') return { w };
    const field = mode === 'meaning' ? 'meaning' : 'word';
    const distractors = shuffle(
      [...new Set(words.filter((x) => x[field] !== w[field]).map((x) => x[field]))]
    ).slice(0, 3);
    return { w, options: shuffle([w[field], ...distractors]), answer: w[field] };
  });
}

export default function VocabQuiz({ words, storageKey }) {
  const [mode, setMode] = useState('meaning');
  const [count, setCount] = useState(10);
  const [questions, setQuestions] = useState(null);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState(null);
  const [input, setInput] = useState('');
  const [log, setLog] = useState([]);
  const [best, setBest] = useLocalStorage(`best:${storageKey}`, {});

  if (words.length < 2) return <p className="muted">You need at least 2 words for a quiz.</p>;

  const start = () => {
    const qs = buildQuestions(words, mode, Math.min(count, words.length));
    setQuestions(qs);
    setIdx(0);
    setPicked(null);
    setInput('');
    setLog([]);
    if (mode === 'listen') setTimeout(() => speak(qs[0].w.word), 300);
  };

  // --- Mode selection ---
  if (!questions) {
    return (
      <div className="panel">
        <h3>Choose a quiz type</h3>
        <div className="mode-list">
          {Object.entries(MODES).map(([k, label]) => (
            <label key={k} className={`mode ${mode === k ? 'active' : ''}`}>
              <input type="radio" name="mode" checked={mode === k} onChange={() => setMode(k)} />
              {label}
              {best[k] != null && <span className="muted"> · best {best[k]}%</span>}
            </label>
          ))}
        </div>
        <div className="toolbar">
          <label>
            Questions:{' '}
            <select className="input small" value={count} onChange={(e) => setCount(+e.target.value)}>
              {[5, 10, 20, 50].map((n) => <option key={n} value={n}>{n}</option>)}
              <option value={9999}>All ({words.length})</option>
            </select>
          </label>
          <button className="btn primary" onClick={start}>Start</button>
        </div>
      </div>
    );
  }

  // --- Results ---
  if (idx >= questions.length) {
    const correct = log.filter((l) => l.ok).length;
    const pct = Math.round((correct / log.length) * 100);
    return (
      <div className="panel">
        <h3>Result: {correct}/{log.length} ({pct}%)</h3>
        {log.some((l) => !l.ok) ? (
          <>
            <p>Words to review:</p>
            <ul className="wrong-list">
              {log.filter((l) => !l.ok).map((l, i) => (
                <li key={i}>
                  <b>{l.w.word}</b> – {l.w.meaning}
                  {l.given && <span className="bad"> (your answer: {l.given})</span>}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p>🎉 Excellent! All answers correct.</p>
        )}
        <div className="toolbar">
          <button className="btn primary" onClick={start}>Try again</button>
          <button className="btn" onClick={() => setQuestions(null)}>Change mode</button>
        </div>
      </div>
    );
  }

  // --- Question ---
  const q = questions[idx];
  const answered = picked !== null;
  const typingMode = mode === 'typing' || mode === 'listen';

  const submit = (value) => {
    if (answered) return;
    const ok = typingMode ? isCorrect(value, [q.w.word, ...(q.w.accept ?? [])]) : value === q.answer;
    setPicked(value);
    const newLog = [...log, { w: q.w, ok, given: ok ? null : value }];
    setLog(newLog);
    if (newLog.length === questions.length) {
      const pct = Math.round((newLog.filter((l) => l.ok).length / newLog.length) * 100);
      if (best[mode] == null || pct > best[mode]) setBest({ ...best, [mode]: pct });
    }
  };

  const next = () => {
    setPicked(null);
    setInput('');
    setIdx(idx + 1);
    if (mode === 'listen' && questions[idx + 1]) setTimeout(() => speak(questions[idx + 1].w.word), 200);
  };

  const lastOk = answered && log[log.length - 1]?.ok;

  return (
    <div className="panel quiz">
      <div className="progress"><div style={{ width: `${(idx / questions.length) * 100}%` }} /></div>
      <p className="muted">Question {idx + 1} / {questions.length}</p>

      <div className="prompt">
        {mode === 'meaning' && <>{q.w.word} <SpeakButton text={q.w.word} /></>}
        {(mode === 'word' || mode === 'typing') && q.w.meaning}
        {mode === 'listen' && <button className="btn big" onClick={() => speak(q.w.word)}>🔊 Play again</button>}
      </div>
      {q.w.type && mode !== 'meaning' && <p className="muted center">({q.w.type})</p>}

      {!typingMode && (
        <div className="options">
          {q.options.map((opt) => {
            let cls = 'option';
            if (answered && opt === q.answer) cls += ' correct';
            else if (answered && opt === picked) cls += ' wrong';
            return (
              <button key={opt} className={cls} disabled={answered} onClick={() => submit(opt)}>
                {opt}
              </button>
            );
          })}
        </div>
      )}

      {typingMode && (
        <form
          className="typing"
          onSubmit={(e) => {
            e.preventDefault();
            if (answered) next();
            else if (input.trim()) submit(input);
          }}
        >
          <input
            autoFocus
            key={idx}
            className={`input ${answered ? (lastOk ? 'ok' : 'err') : ''}`}
            value={input}
            readOnly={answered}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type the English word, then press Enter"
          />
        </form>
      )}

      {answered && (
        <div className={`feedback ${lastOk ? 'good' : 'bad'}`}>
          {lastOk ? '✅ Correct!' : <>❌ Answer: <b>{q.w.word}</b> – {q.w.meaning}</>}
          {q.w.example && <div className="example"><em>{q.w.example}</em></div>}
        </div>
      )}

      {answered && (
        <div className="toolbar right">
          <button className="btn primary" onClick={next} autoFocus={!typingMode}>
            {idx + 1 === questions.length ? 'See result' : 'Next →'}
          </button>
        </div>
      )}
      {answered && typingMode && <p className="muted right-text">Press Enter for the next question</p>}
    </div>
  );
}
