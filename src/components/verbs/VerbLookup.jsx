import { useState } from 'react';
import verbs, { VERB_GROUPS, splitForms } from '../../data/verbs.js';
import VerbRow from './VerbRow.jsx';

export default function VerbLookup() {
  const [query, setQuery] = useState('');
  const [group, setGroup] = useState('all');
  const q = query.toLowerCase().trim();

  const isExact = (v) => [v.base, ...splitForms(v.past), ...splitForms(v.pp)].includes(q);
  const filtered = verbs
    .filter((v) => group === 'all' || v.group === group)
    .filter((v) => !q || [v.base, v.past, v.pp, v.meaning].join(' | ').toLowerCase().includes(q))
    .sort((a, b) => (q ? isExact(b) - isExact(a) : 0)); // exact form matches ("went" → go) first

  return (
    <div>
      <div className="toolbar">
        <input
          className="input"
          placeholder='Search any form or meaning — e.g. "went", "caught", "mua"'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select className="input small" value={group} onChange={(e) => setGroup(e.target.value)}>
          <option value="all">All groups</option>
          {VERB_GROUPS.map((g) => <option key={g.id} value={g.id}>{g.title}</option>)}
        </select>
      </div>
      <div className="table-wrap">
        <table className="verb-table">
          <thead>
            <tr><th>#</th><th>V1</th><th>V2 (past)</th><th>V3 (past participle)</th><th>Meaning</th><th /></tr>
          </thead>
          <tbody>
            {filtered.map((v) => <VerbRow key={v.base} v={v} showNo />)}
          </tbody>
        </table>
      </div>
      {filtered.length === 0 && <p className="muted">No verbs found.</p>}
    </div>
  );
}
