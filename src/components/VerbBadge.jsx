import { useVerbProgress } from '../utils/VerbProgressContext.jsx';

const LABELS = { new: 'New', learning: 'Learning', due: 'Review', mastered: 'Mastered' };

export default function VerbBadge({ base }) {
  const { verbStatus } = useVerbProgress();
  const status = verbStatus(base);
  return <span className={`badge ${status}`}>{LABELS[status]}</span>;
}
