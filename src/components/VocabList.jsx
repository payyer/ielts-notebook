import { useState } from 'react';
import SpeakButton from './SpeakButton.jsx';
import StarButton from './StarButton.jsx';

export default function VocabList({ words }) {
  const [query, setQuery] = useState('');
  const [hideMeaning, setHideMeaning] = useState(false);
  const q = query.toLowerCase().trim();
  const filtered = words.filter(
    (w) => !q || w.word.toLowerCase().includes(q) || w.meaning.toLowerCase().includes(q)
  );

  return (
    <div>
      <div className="toolbar">
        <input
          className="input"
          placeholder="Search word or meaning..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <label className="check">
          <input type="checkbox" checked={hideMeaning} onChange={(e) => setHideMeaning(e.target.checked)} />
          Hide meanings (self-test)
        </label>
      </div>

      <div className="vocab-list">
        {filtered.map((w) => (
          <div className="vocab-item" key={w.lessonId + w.word}>
            <div className="vocab-head">
              <span className="word">{w.word}</span>
              {w.type && <span className="tag">{w.type}</span>}
              {w.ipa && <span className="ipa">{w.ipa}</span>}
              <span className="spacer" />
              <SpeakButton text={w.word} />
              <StarButton word={w} />
            </div>
            <div className={`meaning ${hideMeaning ? 'blurred' : ''}`}>{w.meaning}</div>
            {w.example && (
              <div className="example">
                <em>{w.example}</em> <SpeakButton text={w.example} className="small" />
              </div>
            )}
            {w.synonyms?.length > 0 && (
              <div className="extra"><b>Synonyms:</b> {w.synonyms.join(', ')}</div>
            )}
            {w.collocations?.length > 0 && (
              <div className="extra"><b>Collocations:</b> {w.collocations.join(', ')}</div>
            )}
            {w.note && <div className="extra"><b>Note:</b> {w.note}</div>}
          </div>
        ))}
        {filtered.length === 0 && <p className="muted">No matching words.</p>}
      </div>
    </div>
  );
}
