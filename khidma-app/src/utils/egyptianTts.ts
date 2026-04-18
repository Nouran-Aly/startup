import * as Speech from "expo-speech";

/** Egyptian Arabic (ar-EG) — device TTS; quality varies by OS/voice packs */
const TTS_LANG = "ar-EG";

export function speakEgyptianArabic(text: string): void {
  const trimmed = text.trim();
  if (!trimmed) {
    return;
  }
  Speech.stop();
  Speech.speak(trimmed, {
    language: TTS_LANG,
    pitch: 1,
    rate: 0.95
  });
}

export function stopSpeaking(): void {
  Speech.stop();
}
