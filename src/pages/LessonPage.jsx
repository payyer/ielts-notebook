import { useMemo } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { getLesson, topicsOfLesson } from '../data/index.js';
import VocabList from '../components/VocabList.jsx';
import Flashcards from '../components/Flashcards.jsx';
import VocabQuiz from '../components/VocabQuiz.jsx';
import GrammarTopic from '../components/GrammarTopic.jsx';
import MasteryBadge from '../components/MasteryBadge.jsx';

const TABS = {
  vocab: '📝 Vocabulary',
  flashcards: '🃏 Flashcards',
  quiz: '🎯 Vocab quiz',
  grammar: '📐 Grammar',
};

export default function LessonPage() {
  const { id } = useParams();
  const lesson = getLesson(id);
  const [params, setParams] = useSearchParams();
  const tab = TABS[params.get('tab')] ? params.get('tab') : 'vocab';

  const words = useMemo(
    () => (lesson?.vocabulary ?? []).map((v) => ({ ...v, lessonId: lesson.id, lessonTitle: lesson.title })),
    [lesson]
  );
  const topics = useMemo(() => (lesson ? topicsOfLesson(lesson.id) : []), [lesson]);
  const topicIdx = Math.min(Number(params.get('topic')) || 0, Math.max(topics.length - 1, 0));

  if (!lesson) return <p>Lesson not found. <Link to="/">Go back</Link></p>;

  return (
    <div>
      <Link to="/" className="back">← All lessons</Link>
      <h1>{lesson.title}</h1>
      {lesson.description && <p className="muted">{lesson.description}</p>}

      <div className="tabs">
        {Object.entries(TABS).map(([k, label]) => (
          <button
            key={k}
            className={`tab ${tab === k ? 'active' : ''}`}
            onClick={() => setParams({ tab: k }, { replace: true })}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 'vocab' && <VocabList words={words} />}
      {tab === 'flashcards' && <Flashcards words={words} />}
      {tab === 'quiz' && <VocabQuiz words={words} storageKey={lesson.id} />}
      {tab === 'grammar' &&
        (topics.length === 0 ? (
          <p className="muted">This lesson has no grammar topics yet.</p>
        ) : (
          <>
            {topics.length > 1 && (
              <div className="pills">
                {topics.map((t, i) => (
                  <button
                    key={t.key}
                    className={`pill ${i === topicIdx ? 'active' : ''}`}
                    onClick={() => setParams({ tab: 'grammar', topic: i }, { replace: true })}
                  >
                    {t.title} <MasteryBadge topicKey={t.key} />
                  </button>
                ))}
              </div>
            )}
            <GrammarTopic key={topics[topicIdx].key} topic={topics[topicIdx]} />
          </>
        ))}
    </div>
  );
}
