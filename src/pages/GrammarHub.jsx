import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { lessons, allTopics, questionByKey } from '../data/index.js';
import { useGrammarProgress } from '../utils/GrammarProgressContext.jsx';
import { shuffle, timeAgo } from '../utils/helpers.js';
import MasteryBadge from '../components/MasteryBadge.jsx';
import GrammarPractice from '../components/GrammarPractice.jsx';
import Rich from '../components/Rich.jsx';
import GrammarForms from '../components/GrammarForms.jsx';

const TABS = {
  overview: '📊 Overview',
  mixed: '🔀 Mixed practice',
  mistakes: '📕 Mistake notebook',
  cheatsheet: '📄 Cheat sheet',
};

const topicLink = (t) => `/lesson/${t.lessonId}?tab=grammar&topic=${t.index}`;

export default function GrammarHub() {
  const [params, setParams] = useSearchParams();
  const tab = TABS[params.get('tab')] ? params.get('tab') : 'overview';

  return (
    <div>
      <h1>Grammar review</h1>
      <div className="tabs">
        {Object.entries(TABS).map(([k, label]) => (
          <button key={k} className={`tab ${tab === k ? 'active' : ''}`} onClick={() => setParams({ tab: k })}>
            {label}
          </button>
        ))}
      </div>
      {allTopics.length === 0 && <p className="muted">No grammar topics yet.</p>}
      {tab === 'overview' && <Overview />}
      {tab === 'mixed' && <MixedPractice />}
      {tab === 'mistakes' && <Mistakes />}
      {tab === 'cheatsheet' && <CheatSheet />}
    </div>
  );
}

function Overview() {
  const { topicStats } = useGrammarProgress();
  const due = allTopics.filter((t) => topicStats(t.key).status === 'due');

  return (
    <div>
      {due.length > 0 && (
        <div className="callout">
          <b>{due.length} topic(s) due for review.</b>{' '}
          <Link to="/grammar?tab=mixed&preset=due">Review them now →</Link>
        </div>
      )}
      {lessons.map((l) => {
        const topics = allTopics.filter((t) => t.lessonId === l.id);
        if (topics.length === 0) return null;
        return (
          <div key={l.id} className="panel">
            <h3>{l.title}</h3>
            <table className="topic-table">
              <tbody>
                {topics.map((t) => {
                  const s = topicStats(t.key);
                  return (
                    <tr key={t.key}>
                      <td><Link to={topicLink(t)}>{t.title}</Link></td>
                      <td><MasteryBadge topicKey={t.key} /></td>
                      <td className="muted small">{s.status === 'new' ? '' : `practised ${timeAgo(s.lastPracticed)}`}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      })}
      <p className="muted small">
        How it works: every topic you practise gets a review date. Score ≥ 80% → the next review is later
        (1 → 3 → 7 → 14 → 30 days). Score &lt; 50% → review again today.
      </p>
    </div>
  );
}

function MixedPractice() {
  const { topicStats, pickQuestions } = useGrammarProgress();
  const [params] = useSearchParams();
  const practisable = allTopics.filter((t) => t.questions.length > 0);

  const presets = {
    due: practisable.filter((t) => topicStats(t.key).status === 'due').map((t) => t.key),
    weak: practisable
      .filter((t) => {
        const s = topicStats(t.key);
        return s.mastery != null && s.mastery < 70;
      })
      .map((t) => t.key),
    all: practisable.map((t) => t.key),
  };

  const [selected, setSelected] = useState(() => presets[params.get('preset')] ?? presets.all);
  const [count, setCount] = useState(20);
  const [session, setSession] = useState(null);

  const pool = practisable.filter((t) => selected.includes(t.key)).flatMap((t) => t.questions);

  if (session)
    return (
      <GrammarPractice
        questions={session}
        showTopic={false}
        nextRound={() => pickQuestions(pool, count)}
        onExit={() => setSession(null)}
      />
    );

  const toggle = (key) =>
    setSelected((s) => (s.includes(key) ? s.filter((k) => k !== key) : [...s, key]));

  return (
    <div className="panel">
      <p>
        Questions from different topics are shuffled together, and the topic name stays hidden until you answer —
        so you learn to recognise <i>which</i> structure is needed, just like in the real test.
      </p>
      <div className="toolbar">
        <span>Quick select:</span>
        <button className="btn" onClick={() => setSelected(presets.due)}>Due ({presets.due.length})</button>
        <button className="btn" onClick={() => setSelected(presets.weak)}>Weak &lt; 70% ({presets.weak.length})</button>
        <button className="btn" onClick={() => setSelected(presets.all)}>All</button>
        <button className="btn" onClick={() => setSelected([])}>None</button>
      </div>

      {lessons.map((l) => {
        const topics = practisable.filter((t) => t.lessonId === l.id);
        if (topics.length === 0) return null;
        return (
          <div key={l.id} className="topic-group">
            <div className="muted small">{l.title}</div>
            {topics.map((t) => (
              <label key={t.key} className="check topic-check">
                <input type="checkbox" checked={selected.includes(t.key)} onChange={() => toggle(t.key)} />
                {t.title} <MasteryBadge topicKey={t.key} />
              </label>
            ))}
          </div>
        );
      })}

      <div className="toolbar">
        <label>
          Questions:{' '}
          <select className="input small" value={count} onChange={(e) => setCount(+e.target.value)}>
            {[10, 20, 30].map((n) => <option key={n} value={n}>{n}</option>)}
            <option value={9999}>All</option>
          </select>
        </label>
        <button
          className="btn primary"
          disabled={pool.length === 0}
          onClick={() => setSession(pickQuestions(pool, count))}
        >
          Start ({Math.min(count, pool.length)} questions)
        </button>
      </div>
    </div>
  );
}

function Mistakes() {
  const { mistakes } = useGrammarProgress();
  const [session, setSession] = useState(null);
  const items = Object.entries(mistakes)
    .filter(([k]) => questionByKey[k])
    .map(([k, m]) => ({ q: questionByKey[k], ...m }));

  if (session) return <GrammarPractice questions={session} showTopic={false} onExit={() => setSession(null)} />;

  if (items.length === 0)
    return <p className="muted">Your mistake notebook is empty. Questions you get wrong will appear here.</p>;

  return (
    <div className="panel">
      <p>
        Every question you answer wrongly is saved here. It is removed after you answer it correctly{' '}
        <b>2 times in a row</b>.
      </p>
      <button className="btn primary" onClick={() => setSession(shuffle(items.map((i) => i.q)))}>
        Practise my mistakes ({items.length})
      </button>
      <ul className="mistake-list">
        {items.map(({ q, streak }) => (
          <li key={q.qKey}>
            <span className="tag">{q.topicTitle}</span> <Rich text={q.question} />
            {streak > 0 && <span className="muted small"> · {streak}/2 correct</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

function CheatSheet() {
  return (
    <div>
      <p className="muted">All forms on one page — for a quick look before class or the exam.</p>
      {lessons.map((l) => {
        const topics = allTopics.filter((t) => t.lessonId === l.id);
        if (topics.length === 0) return null;
        return (
          <div key={l.id} className="panel cheat">
            <h3>{l.title}</h3>
            {topics.map((t) => (
              <div key={t.key} className="cheat-topic">
                <h4><Link to={topicLink(t)}>{t.title}</Link></h4>
                {t.summary && <p><Rich text={t.summary} /></p>}
                <GrammarForms topic={t} />
                {t.signalWords?.length > 0 && (
                  <p className="small"><b>Signal words:</b> {t.signalWords.join(' · ')}</p>
                )}
                {t.notes?.length > 0 && (
                  <ul className="small">{t.notes.map((n, j) => <li key={j}><Rich text={n} /></li>)}</ul>
                )}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
