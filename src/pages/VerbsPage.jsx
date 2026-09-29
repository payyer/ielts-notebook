import { useSearchParams } from 'react-router-dom';
import verbs from '../data/verbs.js';
import { useVerbProgress } from '../utils/VerbProgressContext.jsx';
import VerbLookup from '../components/verbs/VerbLookup.jsx';
import VerbLearn from '../components/verbs/VerbLearn.jsx';
import VerbPractice from '../components/verbs/VerbPractice.jsx';

const TABS = { lookup: '🔎 Look up', learn: '📚 Learn by pattern', practice: '✍️ Practice' };

export default function VerbsPage() {
  const [params, setParams] = useSearchParams();
  const tab = TABS[params.get('tab')] ? params.get('tab') : 'lookup';
  const { verbStatus } = useVerbProgress();
  const count = (s) => verbs.filter((v) => verbStatus(v.base) === s).length;

  return (
    <div>
      <h1>Irregular verbs</h1>
      <p className="muted">
        {verbs.length} verbs · {count('mastered')} mastered · {count('learning')} learning · {count('due')} due for review
      </p>
      <div className="tabs">
        {Object.entries(TABS).map(([k, label]) => (
          <button key={k} className={`tab ${tab === k ? 'active' : ''}`} onClick={() => setParams({ tab: k })}>
            {label}
          </button>
        ))}
      </div>
      {tab === 'lookup' && <VerbLookup />}
      {tab === 'learn' && <VerbLearn />}
      {/* key: a "Practise this group" link resets the practice setup */}
      {tab === 'practice' && <VerbPractice key={params.get('group') ?? 'default'} />}
    </div>
  );
}
