import { useState } from 'react';
import Rich from './Rich.jsx';
import { isCorrect, firstAnswer, shuffle } from '../utils/helpers.js';
import { useGrammarProgress } from '../utils/GrammarProgressContext.jsx';

const INSTRUCTIONS = {
  mcq: 'Choose the correct answer',
  fill: 'Fill in the blank',
  correction: 'Find the mistake and type the correction',
  rewrite: 'Rewrite the sentence',
};

const typeOf = (q) => (q.options ? 'mcq' : q.type ?? 'fill');

// Runs questions one by one with instant feedback, and records progress.
// `showTopic`: in mixed practice the topic is hidden until you answer, so you must recognise it yourself.
// `nextRound`: optional () => questions, for a fresh round after the result screen.
export default function GrammarPractice({ questions: initial, onExit, nextRound, showTopic = true }) {
  const { recordAnswer, finishSession } = useGrammarProgress();
  const [questions, setQuestions] = useState(initial);
  const [idx, setIdx] = useState(0);
  const [value, setValue] = useState('');
  const [answered, setAnswered] = useState(false);
  const [log, setLog] = useState([]);

  const restart = (qs) => {
    setQuestions(qs);
    setIdx(0);
    setValue('');
    setAnswered(false);
    setLog([]);
  };

  if (questions.length === 0) return <p className="muted">No questions to practise.</p>;

  // ---- Results ----
  if (idx >= questions.length) {
    const correct = log.filter((l) => l.ok).length;
    const wrong = log.filter((l) => !l.ok);
    const byTopic = {};
    for (const l of log) {
      const t = (byTopic[l.q.topicKey] ??= { title: l.q.topicTitle, correct: 0, total: 0 });
      t.total++;
      if (l.ok) t.correct++;
    }
    return (
      <div className="panel">
        <h3>Result: {correct}/{log.length} ({Math.round((correct / log.length) * 100)}%)</h3>
        {Object.keys(byTopic).length > 1 && (
          <ul className="topic-breakdown">
            {Object.values(byTopic).map((t) => (
              <li key={t.title}>{t.title}: <b>{t.correct}/{t.total}</b></li>
            ))}
          </ul>
        )}
        {wrong.length > 0 ? (
          <>
            <p>Review these (they were added to your <b>Mistake notebook</b>):</p>
            {wrong.map((l, i) => (
              <div key={i} className="exercise bad">
                <div><Rich text={l.q.question} /></div>
                <div>Your answer: <span className="bad">{l.given || '(blank)'}</span> · Correct: <b>{firstAnswer(l.q.answer)}</b></div>
                {l.q.explanation && <div className="muted"><Rich text={l.q.explanation} /></div>}
              </div>
            ))}
          </>
        ) : (
          <p>🎉 Perfect score!</p>
        )}
        <div className="toolbar">
          {nextRound && <button className="btn primary" onClick={() => restart(nextRound())}>Next round →</button>}
          <button className={`btn ${nextRound ? '' : 'primary'}`} onClick={() => restart(shuffle(questions))}>
            Same questions again
          </button>
          {wrong.length > 0 && (
            <button className="btn" onClick={() => restart(wrong.map((l) => l.q))}>Retry mistakes only</button>
          )}
          {onExit && <button className="btn" onClick={onExit}>Back</button>}
        </div>
      </div>
    );
  }

  // ---- Question ----
  const q = questions[idx];
  const type = typeOf(q);
  const ok = answered && log[log.length - 1].ok;

  const submit = (v) => {
    if (answered) return;
    const result = isCorrect(v, q.answer);
    setValue(v);
    setAnswered(true);
    setLog([...log, { q, ok: result, given: v }]);
    recordAnswer(q, result);
  };

  const next = () => {
    if (idx + 1 === questions.length) {
      const results = {};
      for (const l of log) {
        const r = (results[l.q.topicKey] ??= { correct: 0, total: 0 });
        r.total++;
        if (l.ok) r.correct++;
      }
      finishSession(results);
    }
    setIdx(idx + 1);
    setValue('');
    setAnswered(false);
  };

  return (
    <div className="panel quiz">
      <div className="progress"><div style={{ width: `${(idx / questions.length) * 100}%` }} /></div>
      <div className="quiz-meta">
        <span className="muted">Question {idx + 1} / {questions.length}</span>
        {(showTopic || answered) && <span className="tag">{q.topicTitle}</span>}
      </div>

      <p className="instruction">{INSTRUCTIONS[type]}</p>
      <div className="question"><Rich text={q.question} /></div>

      {type === 'mcq' ? (
        <div className="options">
          {q.options.map((opt) => {
            let cls = 'option';
            if (answered && isCorrect(opt, q.answer)) cls += ' correct';
            else if (answered && opt === value) cls += ' wrong';
            return (
              <button key={opt} className={cls} disabled={answered} onClick={() => submit(opt)}>
                {opt}
              </button>
            );
          })}
        </div>
      ) : (
        <form
          className="typing"
          onSubmit={(e) => {
            e.preventDefault();
            if (answered) next();
            else if (value.trim()) submit(value);
          }}
        >
          <input
            autoFocus
            key={idx}
            className={`input ${answered ? (ok ? 'ok' : 'err') : ''}`}
            value={value}
            readOnly={answered}
            onChange={(e) => setValue(e.target.value)}
            placeholder={type === 'rewrite' ? 'Type the full sentence, then press Enter' : 'Type your answer, then press Enter'}
          />
        </form>
      )}

      {answered && (
        <div className={`feedback ${ok ? 'good' : 'bad'}`}>
          {ok ? '✅ Correct!' : <>❌ Correct answer: <b>{firstAnswer(q.answer)}</b></>}
          {q.explanation && <div className="muted"><Rich text={q.explanation} /></div>}
        </div>
      )}

      {answered && (
        <div className="toolbar right">
          <button className="btn primary" onClick={next} autoFocus={type === 'mcq'}>
            {idx + 1 === questions.length ? 'See result' : 'Next →'}
          </button>
        </div>
      )}
    </div>
  );
}
