# IELTS Notebook

Learn IELTS vocabulary & grammar lesson by lesson. React + Vite, **no database**:
lesson content lives in JS files; personal progress (difficult words, scores, grammar review schedule,
mistake notebook) is stored in the browser's `localStorage`.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static site in dist/
npm run sheet    # read the teacher's Google Sheet (npm run sheet -- 4 for LIST 4)
npm run check    # validate lesson data
```

## Features

**Vocabulary** — word list with search, pronunciation (🔊), hide-meaning self-test, ★ difficult words,
flashcards, and a quiz (choose meaning / choose word / type word / dictation).

**Grammar — learn → practise → review**
1. **Learn** (Lesson → Grammar tab): summary, explanation, form, examples, notes, common mistakes.
2. **Practise** right after learning: one question at a time with instant feedback and explanation.
3. **Review** (Grammar page):
   - *Overview* — each topic's status (New / Learning / Due / Mastered) and mastery %.
   - *Spaced repetition* — score ≥ 80% pushes the next review later (1 → 3 → 7 → 14 → 30 days); < 50% resets it.
   - *Mixed practice* — questions from several topics shuffled together; the topic is hidden until you answer.
   - *Mistake notebook* — wrong answers are saved and removed after 2 correct answers in a row.
   - *Cheat sheet* — every form on one page.

## Grammar questions

Each grammar topic has **50 questions** in `src/data/exercises/<topic>.js`, written with that lesson's
vocabulary, and imported by the lesson file (`exercises: presentSimple`). A practice round picks
10/20/30 of them: questions you got wrong last time first, then ones you haven't tried, then the rest.
Answers ignore case, commas, final punctuation and contractions (doesn't = does not).

## Adding a lesson

Create a file in `src/data/lessons/`, e.g. `lesson-02.js`. It is picked up automatically.
Only `meaning` (and the optional `vi` of an example) is in Vietnamese; everything else is English.

```js
export default {
  id: 'lesson-02',          // unique, used in the URL
  order: 2,                 // display order
  title: 'Lesson 2: Environment',
  description: 'Short description (optional)',
  date: '2026-10-04',       // optional

  vocabulary: [
    {
      word: 'deforestation',          // required
      meaning: 'nạn phá rừng',        // required (Vietnamese)
      type: 'n',                      // n, v, adj, adv, n phr ...
      ipa: '/ˌdiːˌfɒrɪˈsteɪʃn/',
      example: 'Deforestation is a major cause of climate change.',
      synonyms: ['...'],              // optional
      collocations: ['...'],          // optional
      note: '...',                    // optional
      accept: ['...'],                // optional: other spellings accepted in "type the word" quizzes
    },
  ],

  grammar: [
    {
      id: 'passive-voice',            // keep it stable — progress is saved under it
      title: 'Passive Voice',
      summary: 'One line for the cheat sheet. Use **bold** for emphasis.',
      explanation: 'When and why to use it... (optional)',
      // 1. Form — grouped (label optional). A flat `structures: [...]` list also works.
      forms: [{ label: 'To be', lines: ['(+) S + was/were + V3/ed'] }],
      // 2. Use — each with an example
      uses: [{ text: 'The action matters more than who does it', example: 'Rice **is grown** in the Mekong Delta.' }],
      // 3. Signal words
      signalWords: ['by + agent'],
      examples: [{ en: 'The bridge **was built** in 1990.' }],   // optional `vi` translation
      notes: ['...'],
      commonMistakes: [{ wrong: 'It was build in 1990.', right: 'It was **built** in 1990.', why: '...' }],
      exercises: [
        // Fill in the blank (default). `answer` can be a string or a list of accepted answers.
        { question: 'The report ___ (write) yesterday.', answer: ['was written'], explanation: '...' },
        // Multiple choice: add `options`
        { question: 'English ___ all over the world.', options: ['speaks', 'is spoken'], answer: 'is spoken' },
        // Error correction: type the corrected word/phrase
        { type: 'correction', question: 'The house was build in 1990.', answer: 'built' },
        // Sentence transformation: full-sentence answers (final punctuation ignored)
        { type: 'rewrite', question: 'They built the house in 1990. → The house ...', answer: ['The house was built in 1990'] },
      ],
    },
  ],
};
```
