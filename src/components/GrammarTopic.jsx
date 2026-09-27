import { useState } from 'react';
import Rich from './Rich.jsx';
import SpeakButton from './SpeakButton.jsx';
import MasteryBadge from './MasteryBadge.jsx';
import GrammarPractice from './GrammarPractice.jsx';
import GrammarForms from './GrammarForms.jsx';
import { timeAgo, timeUntil } from '../utils/helpers.js';
import { useGrammarProgress } from '../utils/GrammarProgressContext.jsx';

// Step 1: Learn (theory) → Step 2: Practice (questions of this topic only)
export default function GrammarTopic({ topic }) {
  const [session, setSession] = useState(null);
  const [count, setCount] = useState(10);
  const { topicStats, answered, pickQuestions } = useGrammarProgress();
  const stats = topicStats(topic.key);

  const total = topic.questions.length;
  const rightCount = topic.questions.filter((q) => answered[q.qKey] === true).length;
  const wrongCount = topic.questions.filter((q) => answered[q.qKey] === false).length;
  const seen = rightCount + wrongCount;

  return (
    <div>
      <section className="panel">
        <div className="topic-head">
          <h2>{topic.title}</h2>
          <MasteryBadge topicKey={topic.key} />
        </div>
        {stats.status !== 'new' && (
          <p className="muted small">
            Last practised {timeAgo(stats.lastPracticed)}
            {stats.due && stats.status !== 'due' && ` · next review ${timeUntil(stats.due)}`}
          </p>
        )}
        {topic.summary && <p className="summary"><Rich text={topic.summary} /></p>}
        {topic.explanation && <p><Rich text={topic.explanation} /></p>}

        {(topic.forms?.length > 0 || topic.structures?.length > 0) && (
          <>
            <h4>1. Form</h4>
            <GrammarForms topic={topic} />
          </>
        )}

        {topic.uses?.length > 0 && (
          <>
            <h4>2. Use</h4>
            <ol className="uses">
              {topic.uses.map((u, j) => (
                <li key={j}>
                  <Rich text={u.text} />
                  {u.example && (
                    <div className="use-example">
                      <Rich text={u.example} /> <SpeakButton text={u.example.replace(/\*\*/g, '')} className="small" />
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </>
        )}

        {topic.signalWords?.length > 0 && (
          <>
            <h4>3. Signal words</h4>
            <ul className="signal-words">
              {topic.signalWords.map((s, j) => <li key={j}><Rich text={s} /></li>)}
            </ul>
          </>
        )}

        {topic.examples?.length > 0 && (
          <>
            <h4>Examples</h4>
            <ul className="examples">
              {topic.examples.map((ex, j) => (
                <li key={j}>
                  <Rich text={ex.en} /> <SpeakButton text={ex.en.replace(/\*\*/g, '')} className="small" />
                  {ex.vi && <div className="muted">{ex.vi}</div>}
                </li>
              ))}
            </ul>
          </>
        )}

        {topic.notes?.length > 0 && (
          <div className="notes">
            <h4>📌 Notes</h4>
            <ul>{topic.notes.map((n, j) => <li key={j}><Rich text={n} /></li>)}</ul>
          </div>
        )}

        {topic.commonMistakes?.length > 0 && (
          <div className="mistakes-box">
            <h4>⚠️ Common mistakes</h4>
            {topic.commonMistakes.map((m, j) => (
              <div key={j} className="mistake">
                <div className="wrong-line">✗ <Rich text={m.wrong} /></div>
                <div className="right-line">✓ <Rich text={m.right} /></div>
                {m.why && <div className="muted small"><Rich text={m.why} /></div>}
              </div>
            ))}
          </div>
        )}

        {topic.questions.length > 0 && (
          <div className="practice-box">
            <h4>✍️ Practice</h4>
            <div className="coverage">
              <div className="coverage-bar">
                <div className="right" style={{ width: `${(rightCount / total) * 100}%` }} />
                <div className="wrong" style={{ width: `${(wrongCount / total) * 100}%` }} />
              </div>
              <span className="muted small">
                {seen}/{total} questions tried · {rightCount} correct · {wrongCount} to redo
              </span>
            </div>
            {!session && (
              <div className="toolbar">
                <label>
                  Questions per round:{' '}
                  <select className="input small" value={count} onChange={(e) => setCount(+e.target.value)}>
                    {[10, 20, 30].filter((n) => n < total).map((n) => <option key={n} value={n}>{n}</option>)}
                    <option value={total}>All ({total})</option>
                  </select>
                </label>
                <button className="btn primary" onClick={() => setSession(pickQuestions(topic.questions, count))}>
                  Start practice
                </button>
              </div>
            )}
            <p className="muted small">
              Each round picks the questions you got wrong first, then ones you haven’t tried yet.
            </p>
          </div>
        )}
      </section>

      {session && (
        <GrammarPractice
          key={topic.key}
          questions={session}
          nextRound={() => pickQuestions(topic.questions, count)}
          onExit={() => setSession(null)}
        />
      )}
    </div>
  );
}
