import { t } from "../i18n";

const MOCK_JOBS = [
  { id: "1", titleAr: "تسريب حنفية المطبخ", titleEn: "Kitchen faucet leak", km: "2.3", egp: "350" },
  { id: "2", titleAr: "مشكلة كهرباء في النور", titleEn: "Lighting issue", km: "5.1", egp: "200" },
  { id: "3", titleAr: "تركيب مروحة سقف", titleEn: "Ceiling fan install", km: "1.0", egp: "450" }
];

/**
 * @param {{ lang: import('../i18n').Lang, tab: string, verified: boolean, onOpenChat: () => void }} props
 */
export default function ProTabs({ lang, tab, verified, onOpenChat }) {
  if (tab === "tasks") {
    return (
      <div className="px-4 pb-28 pt-6">
        <h2 className="mb-4 text-xl font-bold text-blue-900">{t(lang, "proTasks")}</h2>
        <p className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-slate-600">
          {t(lang, "tasksEmpty")}
        </p>
      </div>
    );
  }
  if (tab === "wallet") {
    return (
      <div className="px-4 pb-28 pt-6">
        <h2 className="mb-4 text-xl font-bold text-blue-900">{t(lang, "walletTitle")}</h2>
        <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-8 text-center shadow-sm">
          <p className="text-sm text-slate-600">{t(lang, "walletBalance")}</p>
          <p className="mt-2 text-4xl font-bold text-blue-900">
            1,240 <span className="text-lg font-semibold text-slate-600">{t(lang, "currency")}</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 pb-28 pt-6">
      <div
        className={`mb-6 flex min-h-14 items-center justify-between rounded-2xl px-4 py-3 ${
          verified ? "bg-emerald-50 text-emerald-900" : "bg-amber-50 text-amber-900"
        }`}
      >
        <span className="font-semibold">{verified ? t(lang, "verificationOk") : t(lang, "verificationPending")}</span>
        <span className="text-2xl">{verified ? "✓" : "⏳"}</span>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-blue-900">{t(lang, "proJobs")}</h2>
        <span className="text-sm text-slate-500">{t(lang, "jobNear")}</span>
      </div>

      <ul className="flex flex-col gap-3">
        {MOCK_JOBS.map((job) => (
          <li
            key={job.id}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <p className="font-semibold text-slate-900">{lang === "ar" ? job.titleAr : job.titleEn}</p>
            <div className="mt-2 flex items-center justify-between text-sm text-slate-600">
              <span>📍 {job.km} km</span>
              <span className="font-bold text-blue-900">
                {job.egp} {t(lang, "currency")}
              </span>
            </div>
            <button
              type="button"
              className="mt-3 min-h-12 w-full rounded-xl border-2 border-blue-900 font-bold text-blue-900 transition hover:bg-blue-50"
            >
              {lang === "ar" ? "قدّم عرض" : "Send offer"}
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={onOpenChat}
        className="mt-6 flex min-h-14 w-full items-center justify-center gap-3 rounded-2xl bg-blue-900 font-bold text-white shadow-lg transition hover:bg-blue-800"
      >
        <span className="text-2xl">💬</span>
        {t(lang, "openChat")}
      </button>
    </div>
  );
}
