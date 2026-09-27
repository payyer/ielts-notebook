import { useGrammarProgress } from '../utils/GrammarProgressContext.jsx';

const LABELS = { new: 'New', learning: 'Learning', due: 'Due for review', mastered: 'Mastered' };

export default function MasteryBadge({ topicKey }) {
  const { topicStats } = useGrammarProgress();
  const s = topicStats(topicKey);
  return (
    <span className={`badge ${s.status}`}>
      {LABELS[s.status]}
      {s.mastery != null && ` · ${s.mastery}%`}
    </span>
  );
}
