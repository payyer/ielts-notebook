import { useStarred } from '../utils/StarredContext.jsx';
import { wordKey } from '../data/index.js';

export default function StarButton({ word }) {
  const { isStarred, toggle } = useStarred();
  const on = isStarred(wordKey(word));
  return (
    <button
      type="button"
      className={`icon-btn star ${on ? 'on' : ''}`}
      title={on ? 'Unmark difficult word' : 'Mark as difficult'}
      onClick={(e) => {
        e.stopPropagation();
        toggle(wordKey(word));
      }}
    >
      {on ? '★' : '☆'}
    </button>
  );
}
