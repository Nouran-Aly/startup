import { useState } from "react";
import { t } from "../i18n";

/**
 * @param {{ lang: import('../i18n').Lang, onSuccess: () => void, onBack: () => void }} props
 */
export default function LoginScreen({ lang, onSuccess, onBack }) {
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);
  const [code, setCode] = useState("");

  const digits = phone.replace(/\D/g, "");
  const canSend = digits.length >= 10;
  const canContinue = sent && code.replace(/\D/g, "").length === 6;

  return (
    <div className="mx-auto flex min-h-[100dvh] max-w-lg flex-col px-4 pb-10 pt-8">
      <button
        type="button"
        onClick={onBack}
        className="mb-6 min-h-12 self-start rounded-lg px-3 text-blue-900 underline"
      >
        {t(lang, "back")}
      </button>

      <h1 className="mb-2 text-2xl font-bold text-blue-900">{t(lang, "brand")}</h1>
      <p className="mb-8 text-slate-600">{t(lang, "verifyHint")}</p>

      <label className="mb-2 block text-sm font-semibold text-slate-800">{t(lang, "phoneLabel")}</label>
      <input
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder={t(lang, "phonePlaceholder")}
        className="mb-4 min-h-12 w-full rounded-xl border border-slate-200 px-4 text-lg outline-none ring-blue-900/20 focus:border-blue-900 focus:ring-4"
      />

      {!sent ? (
        <button
          type="button"
          disabled={!canSend}
          onClick={() => setSent(true)}
          className="min-h-12 w-full rounded-xl bg-blue-900 font-bold text-white shadow-md transition enabled:hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {t(lang, "sendCode")}
        </button>
      ) : (
        <>
          <label className="mb-2 mt-4 block text-sm font-semibold text-slate-800">{t(lang, "codeLabel")}</label>
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
            className="mb-6 min-h-12 w-full rounded-xl border border-slate-200 px-4 text-center text-2xl tracking-[0.5em] outline-none focus:border-blue-900 focus:ring-4 focus:ring-blue-900/20"
          />
          <button
            type="button"
            disabled={!canContinue}
            onClick={onSuccess}
            className="min-h-12 w-full rounded-xl bg-blue-900 font-bold text-white shadow-md transition enabled:hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {t(lang, "continue")}
          </button>
        </>
      )}
    </div>
  );
}
