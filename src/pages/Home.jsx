import { Link } from 'react-router-dom';
import { lessons, allWords, allTopics, questionByKey } from '../data/index.js';
import { useStarred } from '../utils/StarredContext.jsx';
import { useGrammarProgress } from '../utils/GrammarProgressContext.jsx';
import { useVerbProgress } from '../utils/VerbProgressContext.jsx';
import verbs from '../data/verbs.js';

export default function Home() {
  const { starred } = useStarred();
  const { topicStats, mistakes } = useGrammarProgress();
  const due = allTopics.filter((t) => topicStats(t.key).status === 'due').length;
  const { verbStatus } = useVerbProgress();
  const verbsDue = verbs.filter((v) => verbStatus(v.base) === 'due').length;
  const mistakeCount = Object.keys(mistakes).filter((k) => questionByKey[k]).length;

  return (
    <div>
      <section className="hero">
        <h1>My IELTS Notebook</h1>
        <p className="muted">
          {lessons.length} lessons · {allWords.length} words · {allTopics.length} grammar topics
        </p>
      </section>

      <div className="stats">
        <Link to="/grammar?tab=mixed&preset=due" className="stat">
          <b>{due}</b><span>grammar topics due</span>
        </Link>
        <Link to="/grammar?tab=mistakes" className="stat">
          <b>{mistakeCount}</b><span>grammar mistakes to fix</span>
        </Link>
        <Link to="/verbs?tab=practice" className="stat">
          <b>{verbsDue}</b><span>irregular verbs to review</span>
        </Link>
        <Link to="/review" className="stat">
          <b>{starred.length}</b><span>difficult words ★</span>
        </Link>
      </div>

      <h2>Lessons</h2>
      <div className="lesson-grid">
        {lessons.map((l) => (
          <Link key={l.id} to={`/lesson/${l.id}`} className="lesson-card">
            <h3>{l.title}</h3>
            {l.description && <p className="muted">{l.description}</p>}
            <div className="lesson-meta">
              <span>📝 {l.vocabulary?.length ?? 0} words</span>
              <span>📐 {l.grammar?.length ?? 0} grammar</span>
              {l.date && <span>📅 {l.date}</span>}
            </div>
          </Link>
        ))}
        {lessons.length === 0 && <p className="muted">No lessons yet. Add a file to src/data/lessons/.</p>}
      </div>
    </div>
  );
}
