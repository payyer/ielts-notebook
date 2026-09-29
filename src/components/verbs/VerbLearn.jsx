import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import verbs, { VERB_GROUPS, chantLabel, chantText } from '../../data/verbs.js';
import { useVerbProgress } from '../../utils/VerbProgressContext.jsx';
import { speakAll } from '../../utils/speak.js';
import Rich from '../Rich.jsx';
import VerbRow from './VerbRow.jsx';

const verbsOf = (groupId) => verbs.filter((v) => v.group === groupId);

function GroupProgress({ groupVerbs }) {
  const { verbStatus } = useVerbProgress();
  const count = (s) => groupVerbs.filter((v) => verbStatus(v.base) === s).length;
  const mastered = count('mastered');
  const started = groupVerbs.length - count('new');
  return (
    <div className="coverage">
      <div className="coverage-bar">
        <div className="right" style={{ width: `${(mastered / groupVerbs.length) * 100}%` }} />
        <div className="learning" style={{ width: `${((started - mastered) / groupVerbs.length) * 100}%` }} />
      </div>
      <span className="muted small">{started}/{groupVerbs.length} started · {mastered} mastered</span>
    </div>
  );
}

function GroupDetail({ index }) {
  const group = VERB_GROUPS[index];
  const groupVerbs = verbsOf(group.id);
  const [hide, setHide] = useState(false);
  const prev = VERB_GROUPS[index - 1];
  const next = VERB_GROUPS[index + 1];

  return (
    <div>
      <Link to="/verbs?tab=learn" className="back">← All groups</Link>
      <div className="panel">
        <p className="muted small">Group {index + 1} of {VERB_GROUPS.length}</p>
        <h2>{group.title}</h2>
        <p className="summary"><Rich text={group.tip} /></p>
        <GroupProgress groupVerbs={groupVerbs} />

        <div className="toolbar">
          <button className="btn" onClick={() => speakAll(groupVerbs.map(chantText), 0.8)}>🔊 Listen to all</button>
          <label className="check">
            <input type="checkbox" checked={hide} onChange={(e) => setHide(e.target.checked)} />
            Hide V2 & V3 (say them, then hover to check)
          </label>
        </div>

        <div className="table-wrap">
          <table className="verb-table">
            <thead>
              <tr><th>V1</th><th>V2</th><th>V3</th><th>Meaning</th><th /></tr>
            </thead>
            <tbody>
              {groupVerbs.map((v) => <VerbRow key={v.base} v={v} hideForms={hide} />)}
            </tbody>
          </table>
        </div>

        <div className="toolbar">
          <Link className="btn primary" to={`/verbs?tab=practice&group=${group.id}`}>✍️ Practise this group</Link>
        </div>
      </div>

      <div className="fc-nav">
        {prev ? <Link className="btn" to={`/verbs?tab=learn&group=${prev.id}`}>← Previous group</Link> : <span />}
        {next ? <Link className="btn" to={`/verbs?tab=learn&group=${next.id}`}>Next group →</Link> : <span />}
      </div>
    </div>
  );
}

export default function VerbLearn() {
  const [params] = useSearchParams();
  const index = VERB_GROUPS.findIndex((g) => g.id === params.get('group'));
  if (index >= 0) return <GroupDetail key={index} index={index} />;

  return (
    <div>
      <p className="muted">
        Learn one group a day. Verbs in a group follow the same pattern, so you remember the rule instead of 76 separate words.
      </p>
      <div className="lesson-grid">
        {VERB_GROUPS.map((g, i) => {
          const groupVerbs = verbsOf(g.id);
          return (
            <Link key={g.id} to={`/verbs?tab=learn&group=${g.id}`} className="lesson-card">
              <div className="muted small">Group {i + 1} · {groupVerbs.length} verbs</div>
              <h3>{g.title}</h3>
              <p className="muted small">{groupVerbs.slice(0, 2).map(chantLabel).join(' · ')}</p>
              <GroupProgress groupVerbs={groupVerbs} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
