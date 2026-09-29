function utterance(text, rate) {
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'en-GB';
  u.rate = rate;
  const voices = window.speechSynthesis.getVoices();
  const voice = voices.find((v) => v.lang === 'en-GB') || voices.find((v) => v.lang.startsWith('en'));
  if (voice) u.voice = voice;
  return u;
}

export function speak(text, rate = 0.9) {
  speakAll([text], rate);
}

// Reads several texts one after another (e.g. every verb of a group).
export function speakAll(texts, rate = 0.9) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  texts.forEach((t) => window.speechSynthesis.speak(utterance(t, rate)));
}
