import { useEffect, useState, useCallback } from 'react';
import { shuffle } from '../utils/helpers.js';
import SpeakButton from './SpeakButton.jsx';
import StarButton from './StarButton.jsx';

export default function Flashcards({ words }) {
  const [deck, setDeck] = useState(words);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [reverse, setReverse] = useState(false); // true: show the meaning first

  useEffect(() => {
    setDeck(words);
    setIndex(0);
    setFlipped(false);
  }, [words]);

  const go = useCallback(
    (step) => {
      setFlipped(false);
      setIndex((i) => (i + step + deck.length) % deck.length);
    },
    [deck.length]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === 'INPUT') return;
      if (e.key === ' ') { e.preventDefault(); setFlipped((f) => !f); }
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go]);

  if (deck.length === 0) return <p className="muted">No words to study yet.</p>;
  const w = deck[Math.min(index, deck.length - 1)];

  const front = (
    <>
      <div className="fc-word">{w.word}</div>
      {w.ipa && <div className="ipa">{w.ipa}</div>}
      {w.type && <span className="tag">{w.type}</span>}
    </>
  );
  const back = (
    <>
      <div className="fc-meaning">{w.meaning}</div>
      {w.example && <div className="example"><em>{w.example}</em></div>}
    </>
  );

  return (
    <div className="flashcards">
      <div className="toolbar">
        <button className="btn" onClick={() => { setDeck(shuffle(deck)); setIndex(0); setFlipped(false); }}>🔀 Shuffle</button>
        <label className="check">
          <input type="checkbox" checked={reverse} onChange={(e) => { setReverse(e.target.checked); setFlipped(false); }} />
          Show Vietnamese meaning first
        </label>
      </div>

      <div className={`card3d ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped((f) => !f)}>
        <div className="face front">
          <div className="fc-actions"><SpeakButton text={w.word} /><StarButton word={w} /></div>
          {reverse ? back : front}
        </div>
        <div className="face back">
          <div className="fc-actions"><SpeakButton text={w.word} /><StarButton word={w} /></div>
          {reverse ? front : back}
        </div>
      </div>

      <div className="fc-nav">
        <button className="btn" onClick={() => go(-1)}>← Previous</button>
        <span>{index + 1} / {deck.length}</span>
        <button className="btn" onClick={() => go(1)}>Next →</button>
      </div>
      <p className="muted center">Tip: Space to flip, ← → to move between cards.</p>
    </div>
  );
}
