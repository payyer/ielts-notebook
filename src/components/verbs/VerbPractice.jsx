import { useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import verbs, { VERB_GROUPS, splitForms, acceptedForms, chantLabel, chantText } from '../../data/verbs.js';
import { useVerbProgress } from '../../utils/VerbProgressContext.jsx';
import { isCorrect, shuffle } from '../../utils/helpers.js';
import SpeakButton from '../SpeakButton.jsx';
import Rich from '../Rich.jsx';

const MODES = {
  forms: { label: 'Type V2 & V3', hint: 'See V1 and its meaning → type the past simple and past participle.' },
  reverse: { label: 'Reverse: V2 / V3 → V1', hint: 'See a past form (e.g. "caught") → type the base verb.' },
  context: { label: 'In context', hint: 'Fill the correct form of the verb in a sentence (Past simple or Present perfect).' },
};

// Past forms that differ from the base, e.g. catch → [caught]; cut → [] (nothing to reverse).
const reverseForms = (v) => [...new Set([...splitForms(v.past), ...splitForms(v.pp)])].filter((f) => f !== v.base);

function buildQuestion(v, mode) {
  if (mode === 'reverse') return { v, mode, shown: shuffle(reverseForms(v))[0] };
  if (mode === 'context') {
    const perfect = Math.random() < 0.5;
    const sentence = perfect ? v.exPerfect : v.exPast;
    const answer = sentence.match(/\*\*(.+?)\*\*/)[1];
    const extra = (perfect ? v.perfectCtxAccept : v.pastCtxAccept) ?? [];
    return {
      v,
      mode,
      sentence,
      prompt: sentence.replace(/\*\*(.+?)\*\*/, `___ (${v.base})`),
      answers: [answer, ...extra],
    };
  }
  return { v, mode };
}

function Session({ questions: initial, onExit, nextRound }) {
  const { record } = useVerbProgress();
  const [questions, setQuestions] = useState(initial);
  const [idx, setIdx] = useState(0);
  const [a, setA] = useState(''); // V2, or the single answer
  const [b, setB] = useState(''); // V3
  const [result, setResult] = useState(null); // { ok, okA, okB }
  const [log, setLog] = useState([]);
  const secondInput = useRef(null);

  const restart = (qs) => {
    setQuestions(qs);
    setIdx(0);
    setA('');
    setB('');
    setResult(null);
    setLog([]);
  };

  if (idx >= questions.length) {
    const wrong = log.filter((l) => !l.ok);
    const correct = log.length - wrong.length;
    return (
      <div className="panel">
        <h3>Result: {correct}/{log.length} ({Math.round((correct / log.length) * 100)}%)</h3>
        {wrong.length > 0 ? (
          <>
            <p>Say these out loud 3 times — they will come back in your next review:</p>
            <ul className="wrong-list">
              {wrong.map((l, i) => (
                <li key={i}>
                  <b>{chantLabel(l.q.v)}</b> – {l.q.v.meaning} <SpeakButton text={chantText(l.q.v)} className="small" />
                  <span className="bad"> (your answer: {l.given || '(blank)'})</span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p>🎉 Perfect score!</p>
        )}
        <div className="toolbar">
          <button className="btn primary" onClick={() => restart(nextRound())}>Next round →</button>
          <button className="btn" onClick={() => restart(shuffle(questions))}>Same verbs again</button>
          <button className="btn" onClick={onExit}>Back</button>
        </div>
      </div>
    );
  }

  const q = questions[idx];
  const { v } = q;
  const answered = result !== null;

  const submit = () => {
    let r;
    if (q.mode === 'forms') {
      const okA = isCorrect(a, acceptedForms(v, 'past'));
      const okB = isCorrect(b, acceptedForms(v, 'pp'));
      r = { ok: okA && okB, okA, okB };
    } else if (q.mode === 'reverse') {
      r = { ok: isCorrect(a, v.base) };
      r.okA = r.ok;
    } else {
      r = { ok: isCorrect(a, q.answers) };
      r.okA = r.ok;
    }
    setResult(r);
    setLog([...log, { q, ok: r.ok, given: q.mode === 'forms' ? `${a || '–'} / ${b || '–'}` : a }]);
    record(v.base, r.ok);
  };

  const next = () => {
    setIdx(idx + 1);
    setA('');
    setB('');
    setResult(null);
  };

  const fieldCls = (ok) => `input ${answered ? (ok ? 'ok' : 'err') : ''}`;

  return (
    <div className="panel quiz">
      <div className="progress"><div style={{ width: `${(idx / questions.length) * 100}%` }} /></div>
      <p className="muted">Question {idx + 1} / {questions.length}</p>

      {q.mode === 'forms' && (
        <>
          <div className="prompt">{v.base} <SpeakButton text={v.base} /></div>
          <p className="muted center">{v.meaning}</p>
        </>
      )}
      {q.mode === 'reverse' && (
        <>
          <div className="prompt">{q.shown} <SpeakButton text={q.shown} /></div>
          <p className="muted center">What is the base verb (V1)?</p>
        </>
      )}
      {q.mode === 'context' && (
        <>
          <p className="instruction">Fill in the correct form of the verb</p>
          <div className="question"><Rich text={q.prompt} /></div>
        </>
      )}

      <form
        className="verb-inputs"
        onSubmit={(e) => {
          e.preventDefault();
          if (answered) next();
          else if (a.trim() && (q.mode !== 'forms' || b.trim())) submit();
          else if (q.mode === 'forms' && a.trim()) secondInput.current?.focus();
        }}
      >
        <label>
          {q.mode === 'forms' ? 'V2 (past simple)' : q.mode === 'reverse' ? 'V1 (base form)' : 'Your answer'}
          <input
            key={`a${idx}`}
            autoFocus
            className={fieldCls(result?.okA)}
            value={a}
            readOnly={answered}
            onChange={(e) => setA(e.target.value)}
            autoComplete="off"
            autoCapitalize="off"
          />
        </label>
        {q.mode === 'forms' && (
          <label>
            V3 (past participle)
            <input
              key={`b${idx}`}
              ref={secondInput}
              className={fieldCls(result?.okB)}
              value={b}
              readOnly={answered}
              onChange={(e) => setB(e.target.value)}
              autoComplete="off"
              autoCapitalize="off"
            />
          </label>
        )}
        <button type="submit" className="btn primary">{answered ? (idx + 1 === questions.length ? 'See result' : 'Next →') : 'Check'}</button>
      </form>

      {answered && (
        <div className={`feedback ${result.ok ? 'good' : 'bad'}`}>
          {result.ok ? '✅ Correct!' : '❌ Not quite.'}{' '}
          <b>{chantLabel(v)}</b> <SpeakButton text={chantText(v)} className="small" /> – {v.meaning}
          {q.mode === 'context' && <div className="example"><Rich text={q.sentence} /></div>}
          {v.note && <div className="muted small">{v.note}</div>}
        </div>
      )}
      {answered && <p className="muted right-text">Press Enter for the next question</p>}
    </div>
  );
}

export default function VerbPractice() {
  const { verbStatus, pickVerbs } = useVerbProgress();
  const [params] = useSearchParams();
  const dueVerbs = verbs.filter((v) => verbStatus(v.base) === 'due');

  const [mode, setMode] = useState('forms');
  const [scope, setScope] = useState(() => params.get('group') ?? (dueVerbs.length ? 'due' : 'all'));
  const [count, setCount] = useState(10);
  const [session, setSession] = useState(null);

  const poolFor = () => {
    const base = scope === 'due' ? dueVerbs : scope === 'all' ? verbs : verbs.filter((v) => v.group === scope);
    return mode === 'reverse' ? base.filter((v) => reverseForms(v).length > 0) : base;
  };
  const build = () => pickVerbs(poolFor(), count).map((v) => buildQuestion(v, mode));

  if (session) return <Session questions={session} onExit={() => setSession(null)} nextRound={build} />;

  const pool = poolFor();
  return (
    <div className="panel">
      <h3>Practice</h3>
      <div className="mode-list">
        {Object.entries(MODES).map(([k, m]) => (
          <label key={k} className={`mode ${mode === k ? 'active' : ''}`}>
            <input type="radio" name="verb-mode" checked={mode === k} onChange={() => setMode(k)} />
            <span><b>{m.label}</b> <span className="muted small">— {m.hint}</span></span>
          </label>
        ))}
      </div>
      <div className="toolbar">
        <label>
          Verbs:{' '}
          <select className="input small" value={scope} onChange={(e) => setScope(e.target.value)}>
            <option value="due">Due for review ({dueVerbs.length})</option>
            <option value="all">All verbs ({verbs.length})</option>
            {VERB_GROUPS.map((g, i) => <option key={g.id} value={g.id}>Group {i + 1}: {g.title}</option>)}
          </select>
        </label>
        <label>
          Questions:{' '}
          <select className="input small" value={count} onChange={(e) => setCount(+e.target.value)}>
            {[10, 20, 30].map((n) => <option key={n} value={n}>{n}</option>)}
            <option value={9999}>All</option>
          </select>
        </label>
        <button className="btn primary" disabled={pool.length === 0} onClick={() => setSession(build())}>
          Start ({Math.min(count, pool.length)} verbs)
        </button>
      </div>
      <p className="muted small">
        Each round picks verbs due for review first, then new ones. A wrong answer brings the verb back today;
        a right answer on its review day pushes it further away (1 → 3 → 7 → 14 → 30 days).
      </p>
    </div>
  );
}
