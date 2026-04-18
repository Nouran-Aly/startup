import { useEffect, useState } from "react";
import BottomNav from "./components/BottomNav.jsx";
import ChatVoice from "./components/ChatVoice.jsx";
import EntryGate from "./components/EntryGate.jsx";
import HomeownerTabs from "./components/HomeownerTabs.jsx";
import LoginScreen from "./components/LoginScreen.jsx";
import ProTabs from "./components/ProTabs.jsx";

/**
 * Full app flow: Role gate → Phone login → Role-specific dashboard + bottom nav → Voice chat overlay
 * @typedef {'ar' | 'en'} Lang
 * @typedef {'homeowner' | 'pro'} Role
 * @typedef {'gate' | 'login' | 'app'} Step
 */

export default function App() {
  /** @type {[Lang, React.Dispatch<React.SetStateAction<Lang>>]} */
  const [lang, setLang] = useState(
    /** @type {Lang} */ ("ar")
  );
  /** @type {[Step, React.Dispatch<React.SetStateAction<Step>>]} */
  const [step, setStep] = useState(/** @type {Step} */ ("gate"));
  /** @type {[Role | null, React.Dispatch<React.SetStateAction<Role | null>>]} */
  const [role, setRole] = useState(/** @type {Role | null} */ (null));
  const [homeTab, setHomeTab] = useState("home");
  const [proTab, setProTab] = useState("jobs");
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    document.documentElement.lang = lang === "ar" ? "ar" : "en";
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const handleGateSelect = (r) => {
    setRole(r);
    setStep("login");
  };

  const handleLoginSuccess = () => {
    setStep("app");
  };

  const handleLogoutToGate = () => {
    setStep("gate");
    setRole(null);
    setHomeTab("home");
    setProTab("jobs");
    setShowChat(false);
  };

  if (showChat) {
    return <ChatVoice lang={lang} onBack={() => setShowChat(false)} />;
  }

  if (step === "gate") {
    return <EntryGate lang={lang} setLang={setLang} onSelectRole={handleGateSelect} />;
  }

  if (step === "login" && role) {
    return (
      <LoginScreen
        lang={lang}
        onSuccess={handleLoginSuccess}
        onBack={() => {
          setStep("gate");
          setRole(null);
        }}
      />
    );
  }

  if (step === "app" && role === "homeowner") {
    return (
      <div className="min-h-[100dvh] bg-white">
        <header className="sticky top-0 z-30 border-b border-slate-100 bg-white/95 px-4 py-3">
          <div className="mx-auto flex max-w-lg items-center justify-between">
            <span className="text-lg font-bold text-blue-900">Khidma</span>
            <button
              type="button"
              onClick={handleLogoutToGate}
              className="min-h-12 rounded-xl px-3 text-sm font-semibold text-slate-600 underline"
            >
              {lang === "ar" ? "خروج" : "Sign out"}
            </button>
          </div>
        </header>
        <HomeownerTabs lang={lang} tab={homeTab} onOpenChat={() => setShowChat(true)} />
        <BottomNav lang={lang} variant="homeowner" active={homeTab} onChange={setHomeTab} />
      </div>
    );
  }

  if (step === "app" && role === "pro") {
    const verified = false;
    return (
      <div className="min-h-[100dvh] bg-white">
        <header className="sticky top-0 z-30 border-b border-slate-100 bg-white/95 px-4 py-3">
          <div className="mx-auto flex max-w-lg items-center justify-between">
            <span className="text-lg font-bold text-blue-900">Khidma Pro</span>
            <button
              type="button"
              onClick={handleLogoutToGate}
              className="min-h-12 rounded-xl px-3 text-sm font-semibold text-slate-600 underline"
            >
              {lang === "ar" ? "خروج" : "Sign out"}
            </button>
          </div>
        </header>
        <ProTabs
          lang={lang}
          tab={proTab}
          verified={verified}
          onOpenChat={() => setShowChat(true)}
        />
        <BottomNav lang={lang} variant="pro" active={proTab} onChange={setProTab} />
      </div>
    );
  }

  return (
    <div className="flex min-h-[100dvh] items-center justify-center p-6 text-slate-600">
      {lang === "ar" ? "حدث خطأ في التحميل." : "Something went wrong."}
    </div>
  );
}
