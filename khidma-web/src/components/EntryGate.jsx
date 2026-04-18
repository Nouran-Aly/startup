import { t } from "../i18n";

/**
 * @param {{
 *   lang: import('../i18n').Lang,
 *   setLang: (l: import('../i18n').Lang) => void,
 *   onSelectRole: (role: 'homeowner' | 'pro') => void
 * }} props
 */
export default function EntryGate({ lang, setLang, onSelectRole }) {
  return (
    <div className="mx-auto flex min-h-[100dvh] max-w-lg flex-col px-4 pb-8 pt-10">
      <header className="mb-8 flex flex-col items-center gap-3">
        <div className="flex w-full items-center justify-between gap-2">
          <span className="text-2xl font-bold text-blue-900">{t(lang, "brand")}</span>
          <div className="flex rounded-full border border-slate-200 bg-slate-50 p-1">
            <button
              type="button"
              onClick={() => setLang("ar")}
              className={`min-h-12 min-w-[4.5rem] rounded-full px-3 text-sm font-semibold ${
                lang === "ar" ? "bg-blue-900 text-white" : "text-slate-600"
              }`}
            >
              {t(lang, "langAr")}
            </button>
            <button
              type="button"
              onClick={() => setLang("en")}
              className={`min-h-12 min-w-[4.5rem] rounded-full px-3 text-sm font-semibold ${
                lang === "en" ? "bg-blue-900 text-white" : "text-slate-600"
              }`}
            >
              {t(lang, "langEn")}
            </button>
          </div>
        </div>
        <p className="text-center text-slate-600">{t(lang, "tagline")}</p>
      </header>

      <div className="flex flex-1 flex-col gap-4 justify-center">
        <button
          type="button"
          onClick={() => onSelectRole("homeowner")}
          className="flex min-h-[140px] flex-col items-center justify-center gap-4 rounded-2xl border-2 border-blue-200 bg-gradient-to-br from-white to-blue-50 p-6 text-center shadow-sm transition hover:border-blue-400 hover:shadow-md active:scale-[0.99]"
        >
          <span className="text-5xl" aria-hidden>
            🏠
          </span>
          <span className="text-lg font-bold text-blue-900">{t(lang, "homeownerCard")}</span>
          <span className="text-sm text-slate-600">{t(lang, "homeownerSub")}</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectRole("pro")}
          className="flex min-h-[140px] flex-col items-center justify-center gap-4 rounded-2xl border-2 border-blue-200 bg-gradient-to-br from-white to-slate-50 p-6 text-center shadow-sm transition hover:border-blue-400 hover:shadow-md active:scale-[0.99]"
        >
          <span className="text-5xl" aria-hidden>
            🛠️
          </span>
          <span className="text-lg font-bold text-blue-900">{t(lang, "proCard")}</span>
          <span className="text-sm text-slate-600">{t(lang, "proSub")}</span>
        </button>
      </div>
    </div>
  );
}
