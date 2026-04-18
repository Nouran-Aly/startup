import { useCallback, useRef, useState } from "react";
import { t } from "../i18n";

/**
 * Read message aloud in Arabic (Web Speech API)
 * @param {string} text
 */
function speakArabic(text) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "ar-EG";
  u.rate = 0.95;
  window.speechSynthesis.speak(u);
}

/**
 * @param {{ lang: import('../i18n').Lang, onBack: () => void }} props
 */
export default function ChatVoice({ lang, onBack }) {
  const [messages, setMessages] = useState(() => [
    {
      id: "m1",
      role: "other",
      text: lang === "ar" ? "مساء الخير، تحب الموعد امتى؟" : "Good evening, what time works for you?",
      ts: Date.now()
    }
  ]);
  const [input, setInput] = useState("");
  const [recording, setRecording] = useState(false);
  const [recNote, setRecNote] = useState("");
  const mediaRef = useRef(null);
  const chunksRef = useRef([]);

  const sendText = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { id: String(Date.now()), role: "me", text, ts: Date.now() }]);
    setInput("");
  };

  const startMic = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setRecNote("Mic not supported");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      mediaRef.current = mr;
      chunksRef.current = [];
      mr.ondataavailable = (e) => {
        if (e.data.size) chunksRef.current.push(e.data);
      };
      mr.onstop = () => {
        stream.getTracks().forEach((tr) => tr.stop());
        setMessages((m) => [
          ...m,
          {
            id: String(Date.now()),
            role: "me",
            text: `🎤 ${t(lang, "voiceNoteSent")}`,
            ts: Date.now(),
            isVoice: true
          }
        ]);
        setRecNote("");
      };
      mr.start();
      setRecording(true);
      setRecNote(t(lang, "recording"));
    } catch {
      setRecNote("Mic permission denied");
    }
  };

  const stopMic = useCallback(() => {
    const mr = mediaRef.current;
    if (mr && mr.state !== "inactive") {
      mr.stop();
    }
    mediaRef.current = null;
    setRecording(false);
  }, []);

  return (
    <div className="flex min-h-[100dvh] flex-col bg-white">
      <header className="flex items-center gap-3 border-b border-slate-200 px-3 py-3">
        <button
          type="button"
          onClick={onBack}
          className="min-h-12 min-w-12 rounded-xl text-2xl font-bold text-blue-900"
          aria-label={t(lang, "back")}
        >
          ‹
        </button>
        <h1 className="text-lg font-bold text-blue-900">{t(lang, "chatTitle")}</h1>
      </header>

      <div className="flex-1 space-y-3 overflow-y-auto px-3 py-4 pb-36">
        {messages.map((msg) => {
          const mine = msg.role === "me";
          return (
            <div key={msg.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
              <div
                className={`flex max-w-[85%] items-end gap-2 rounded-2xl px-4 py-3 ${
                  mine ? "bg-blue-900 text-white" : "border border-slate-200 bg-slate-50 text-slate-900"
                }`}
              >
                <p className="whitespace-pre-wrap text-base leading-relaxed">{msg.text}</p>
                <button
                  type="button"
                  onClick={() => speakArabic(msg.text)}
                  className="shrink-0 min-h-12 min-w-12 rounded-xl bg-white/20 text-xl hover:bg-white/30"
                  aria-label="Play"
                >
                  🔊
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="fixed bottom-0 left-0 right-0 border-t border-slate-200 bg-white p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        {recNote ? <p className="mb-2 text-center text-sm text-amber-700">{recNote}</p> : null}
        <div className="mx-auto flex max-w-lg items-end gap-2">
          <button
            type="button"
            onMouseDown={startMic}
            onMouseUp={stopMic}
            onTouchStart={startMic}
            onTouchEnd={stopMic}
            className={`flex min-h-14 min-w-14 shrink-0 items-center justify-center rounded-2xl text-3xl ${
              recording ? "bg-red-600 text-white" : "bg-slate-100 text-blue-900"
            }`}
            aria-label="Voice note"
          >
            🎤
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t(lang, "typeMessage")}
            className="min-h-14 flex-1 rounded-2xl border border-slate-200 px-4 text-base outline-none focus:border-blue-900 focus:ring-4 focus:ring-blue-900/15"
            onKeyDown={(e) => e.key === "Enter" && sendText()}
          />
          <button
            type="button"
            onClick={sendText}
            className="min-h-14 min-w-[5.5rem] rounded-2xl bg-blue-900 font-bold text-white shadow-md"
          >
            {t(lang, "send")}
          </button>
        </div>
      </div>
    </div>
  );
}
