import { t } from "../i18n";

/**
 * @param {{ lang: import('../i18n').Lang, variant: 'homeowner' | 'pro', active: string, onChange: (id: string) => void }} props
 */
export default function BottomNav({ lang, variant, active, onChange }) {
  const homeownerItems = [
    { id: "home", label: t(lang, "homeownerHome") },
    { id: "bookings", label: t(lang, "homeownerBookings") },
    { id: "profile", label: t(lang, "homeownerProfile") }
  ];
  const proItems = [
    { id: "jobs", label: t(lang, "proJobs") },
    { id: "tasks", label: t(lang, "proTasks") },
    { id: "wallet", label: t(lang, "proWallet") }
  ];
  const items = variant === "homeowner" ? homeownerItems : proItems;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_20px_rgba(15,23,42,0.06)]"
      role="navigation"
      aria-label="Main"
    >
      <div className="mx-auto flex max-w-lg items-stretch justify-around gap-1 px-2 py-2">
        {items.map((item) => {
          const isOn = active === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange(item.id)}
              className={`min-h-12 flex-1 rounded-xl px-2 text-sm font-semibold transition-colors ${
                isOn
                  ? "bg-blue-900 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
