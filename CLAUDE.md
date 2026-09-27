# IELTS Notebook

A React + Vite site for learning IELTS vocabulary and grammar, used by the owner and their classmates.
It is deployed on Vercel and has **no backend**. Lesson content lives in JS files. Each viewer's progress
(★ words, scores, the grammar review schedule, the mistake notebook) lives in their browser's `localStorage`.
Keep it simple: don't add a database, login or export/import unless the user asks.

The user writes in Vietnamese, so reply in Vietnamese.

## Commands

```bash
npm run dev              # http://localhost:5173
npm run build            # must pass before you report a change as done
npm run sheet            # summary of every LIST tab in the teacher's sheet
npm run sheet -- 4 5     # full JSON (vocab + grammar) of LIST 4 and 5
npm run check            # validate all lesson data (see "Validation" below)
```

## Language rules

- **Everything on the site is in English**: UI, grammar explanations, uses, notes, common mistakes, exercises and explanations.
- **Only a word's `meaning` is in Vietnamese** (the optional `vi` translation of an example is allowed too).
- The teacher writes grammar in Vietnamese, so translate it into English and keep her structure and example sentences.

## Data layout

```
src/data/lessons/list-0N.js       one file per LIST tab (auto-loaded, no registration needed)
src/data/exercises/<topic-id>.js  50 questions per grammar topic, imported by the lesson file
```

Look at `src/data/lessons/list-01.js` and `src/data/exercises/present-simple.js` as the reference format.
Field docs are in README.md.

**Progress keys depend on data, so don't break them:**
- A lesson `id` (`list-N`) and a grammar topic `id` (kebab-case, e.g. `present-perfect`) must never change once published.
- A word's progress key is `lessonId:word`, so renaming a word resets its ★.
- A question's key is `topicKey#index`, so **never reorder or delete questions in a published exercise file**.
  To fix a question, edit it in place. To add questions, append them at the end.

## Source: the teacher's Google Sheet

https://docs.google.com/spreadsheets/d/1rH0Q_ztqDhj3Eqb1GpZiK7v88rTwYLSe9i96AK_2bDU (must stay "anyone with the link can view")

- One tab per list: `LIST 1`, `LIST 2`, … Each list covers 2+ class lessons. Row 2, col A holds the label, e.g. `LIST 3 (LESSON 6-7)`.
- Col A = vocabulary. Some cells have a second line `Ex: ...`, which becomes the `example`.
- Col B = Vietnamese meaning.
- Col L = grammar: a title cell (`Present simple - Hiện tại đơn`), then a content cell with `1. FORM`, `2. USE` (① ② …) and `3. SIGNAL WORDS`.
- `npm run sheet` handles the CSV parsing. A tab name that doesn't exist silently returns another tab ("MIDTERM & FINAL"), and the script detects that.
- Known quirk: tab `LIST 9` is labelled "LIST 8 (LESSON 27-30)". Use the tab number for the file and id (`list-9`).

## Update workflow

The user will say "cập nhật LIST N" or "cô vừa thêm bài mới". Follow these steps:

1. **Find what's new.** Run `npm run sheet` and compare it with `src/data/lessons/`.
   - For a new list, do steps 2–5.
   - For an existing list, compare word by word and topic by topic, then apply only the differences (see the progress key rules above).
   - If the user names a specific list, do only that list.
2. **Create `src/data/lessons/list-0N.js`** from `npm run sheet -- N`:
   - `id: 'list-N'`, `order: N`, a title like `List N: <Topic>` (name the topic from the vocab), and `description: 'Lessons X–Y · <grammar titles>'`.
   - Keep every word and meaning exactly as the teacher wrote them, in her order. Clean them up only like this:
     - `(idiom)`, `(adj)`, `(v)`, `(n/v)` markers → `type`.
     - `x = y` → `word: x`, `synonyms: [y]`.
     - `(gg meet / zoom)`-style examples → `note: 'e.g. ...'`.
     - `lend - lent - lent` → `word: 'lend'`, `note` with the verb forms.
     - Slash variants like `check / cheque` and `catch the bus / train` → keep the word as written and list each variant in `accept`.
     - `s.o` phrases → add `accept` variants with "someone" / "sb".
   - Add `type`, `ipa` (single words and short phrases; skip it if unsure) and an `example` for every word. Where natural, write the example in that list's grammar tense.
   - If the teacher's own example has a grammar mistake, fix it and tell the user.
3. **Grammar topic** (for each col-L title):
   - `id`: stable kebab-case. `title` is the English part of the title.
   - `summary`: one line.
   - `forms`: grouped `{ label?, lines }`, taken from 1. FORM.
   - `uses`: `{ text, example }`, taken from 2. USE, with the tense verbs in **bold**.
   - `signalWords`: from 3. SIGNAL WORDS.
   - `notes`: short, useful rules.
   - `commonMistakes`: 2–3 items of `{ wrong, right, why }`.
4. **Create `src/data/exercises/<topic-id>.js` with exactly 50 questions**:
   - Write most sentences with **that list's vocabulary**.
   - The mix used so far: about 24 fill-in (`___ (verb)`), 13 mcq (4 `options`), 8 `correction` (answer = the corrected word/phrase only) and 5–6 `rewrite`.
   - Every question needs an `explanation` in English.
   - `answer` can be an array. List real alternatives (UK/US spelling, "have been / have gone"). Don't list contraction variants, because matching already treats `doesn't` = `does not`, `I'm` = `I am`, and ignores case, commas and final punctuation. It does **not** expand `'s`, so write answers in full form.
   - Each question must have exactly one defensible answer. Avoid sentences where two tenses are both correct.
   - Group questions by type in the order fill → mcq → correction → rewrite. The practice screen shuffles them.
5. **Validate**: run `npm run check` (it must pass and show 50 questions per topic), then `npm run build`.
6. **Report to the user** (in Vietnamese). Include:
   - what was added or changed, with word and question counts per list/topic;
   - anything odd in the sheet (typos, mislabelled tabs, duplicate words);
   - teacher examples you corrected.

   Then remind them to deploy: `git add . && git commit -m "Add list N" && git push`, after which Vercel redeploys automatically. Only commit or push yourself if the user asks.

## Validation (`npm run check`)

It fails on:
- duplicate lesson, word or topic ids, and duplicate questions;
- a word missing `word` or `meaning`;
- a topic without an `id`;
- an MCQ without exactly one correct option;
- a fill question without `___`;
- an unknown question type.

It warns when a topic doesn't have 50 questions.

## Deployment

The site runs on Vercel from GitHub. It uses `BrowserRouter` with `base: '/'` in `vite.config.js`, and `vercel.json` rewrites all paths to `index.html`.
Keep all three, or refreshing a URL like `/lesson/list-1` returns a 404 / blank page.
