// Renders text; **word** becomes bold
export default function Rich({ text }) {
  if (!text) return null;
  return String(text)
    .split(/(\*\*[^*]+\*\*)/g)
    .map((part, i) =>
      part.startsWith('**') && part.endsWith('**') ? <strong key={i}>{part.slice(2, -2)}</strong> : part
    );
}
