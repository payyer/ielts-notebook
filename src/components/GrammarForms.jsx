import Rich from './Rich.jsx';

// Renders `forms` (grouped, e.g. "To be" / "Ordinary verbs") or the flat `structures` list.
export default function GrammarForms({ topic }) {
  const groups = topic.forms ?? (topic.structures?.length ? [{ lines: topic.structures }] : []);
  if (groups.length === 0) return null;
  return (
    <div className="forms">
      {groups.map((g, i) => (
        <div key={i} className="structures">
          {g.label && <div className="form-label">{g.label}</div>}
          {g.lines.map((s, j) => <code key={j}><Rich text={s} /></code>)}
        </div>
      ))}
    </div>
  );
}
