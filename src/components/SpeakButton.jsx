import { speak } from '../utils/speak.js';

export default function SpeakButton({ text, className = '' }) {
  return (
    <button
      type="button"
      className={`icon-btn ${className}`}
      title="Listen"
      onClick={(e) => {
        e.stopPropagation();
        speak(text);
      }}
    >
      🔊
    </button>
  );
}
