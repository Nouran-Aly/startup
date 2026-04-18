import { t } from "../i18n";

const SERVICES = [
  { id: "plumb", icon: "🔧", ar: "سباكة", en: "Plumbing" },
  { id: "elec", icon: "⚡", ar: "كهرباء", en: "Electricity" },
  { id: "paint", icon: "🎨", ar: "نقاشة", en: "Painting" },
  { id: "wood", icon: "🪚", ar: "نجارة", en: "Carpentry" },
  { id: "ac", icon: "❄️", ar: "تكييف", en: "AC" },
  { id: "clean", icon: "🧹", ar: "نظافة", en: "Cleaning" }
];

/**
 * @param {{ lang: import('../i18n').Lang, tab: string, onOpenChat: () => void }} props
 */
export default function HomeownerTabs({ lang, tab, onOpenChat }) {
  if (tab === "bookings") {
    return (
      <div className="px-4 pb-28 pt-6">
        <h2 className="mb-4 text-xl font-bold text-blue-900">{t(lang, "homeownerBookings")}</h2>
        <p className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-slate-600">
          {t(lang, "bookingsEmpty")}
        </p>
      </div>
    );
  }
  if (tab === "profile") {
    return (
      <div className="px-4 pb-28 pt-6">
        <h2 className="mb-4 text-xl font-bold text-blue-900">{t(lang, "profileTitle")}</h2>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-slate-700">+20 10 •••• ••••</p>
          <p className="mt-2 text-sm text-slate-500">{t(lang, "loggedIn")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 pb-28 pt-6">
      <h2 className="mb-2 text-xl font-bold text-blue-900">{t(lang, "servicesTitle")}</h2>
      <p className="mb-6 text-slate-600">{t(lang, "tagline")}</p>

      <div className="mb-8 grid grid-cols-2 gap-3">
        {SERVICES.map((s) => (
          <button
            key={s.id}
            type="button"
            className="flex min-h-[100px] flex-col items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-300 active:scale-[0.98]"
          >
            <span className="text-4xl">{s.icon}</span>
            <span className="text-center font-semibold text-slate-800">{lang === "ar" ? s.ar : s.en}</span>
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={onOpenChat}
        className="flex min-h-14 w-full items-center justify-center gap-3 rounded-2xl bg-blue-900 font-bold text-white shadow-lg transition hover:bg-blue-800"
      >
        <span className="text-2xl">💬</span>
        {t(lang, "openChat")}
      </button>
    </div>
  );
}
