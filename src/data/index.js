// Auto-loads every file in ./lessons — add a new file and the lesson appears.
const modules = import.meta.glob('./lessons/*.js', { eager: true });

export const lessons = Object.values(modules)
  .map((m) => m.default)
  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

export const getLesson = (id) => lessons.find((l) => l.id === id);

export const allWords = lessons.flatMap((l) =>
  (l.vocabulary ?? []).map((v) => ({ ...v, lessonId: l.id, lessonTitle: l.title }))
);

export const wordKey = (w) => `${w.lessonId}:${w.word}`;

// ---- Grammar ----
// A topic's key uses its `id` if given, otherwise its title, so reordering topics keeps progress.
export const topicKey = (lessonId, topic) => `${lessonId}::${topic.id ?? topic.title}`;

export const allTopics = lessons.flatMap((l) =>
  (l.grammar ?? []).map((g, index) => {
    const key = topicKey(l.id, g);
    return {
      ...g,
      key,
      index,
      lessonId: l.id,
      lessonTitle: l.title,
      questions: (g.exercises ?? []).map((ex, i) => ({
        ...ex,
        qKey: `${key}#${i}`,
        topicKey: key,
        topicTitle: g.title,
      })),
    };
  })
);

export const topicsOfLesson = (lessonId) => allTopics.filter((t) => t.lessonId === lessonId);

export const allQuestions = allTopics.flatMap((t) => t.questions);
export const questionByKey = Object.fromEntries(allQuestions.map((q) => [q.qKey, q]));
