import { useState } from "react";
import { LockKeyhole } from "lucide-react";
import { useTranslation } from "react-i18next";
import Login from "./components/Login";
import CreateAccount from "./components/CreateAccount";
import LanguageSwitcher from "./components/LanguageSwitcher";

export default function Authentication() {
  const [isLogin, setIsLogin] = useState(true);
  const { t } = useTranslation();

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left side — dark panel */}
      <div className="hidden flex-col justify-between bg-zinc-900 p-10 text-white lg:flex">
        <div className="flex items-center gap-2 text-2xl font-medium">
          <LockKeyhole className="size-7" />
          Private Pay
        </div>
        <blockquote className="space-y-2">
          <p className="text-md leading-relaxed text-zinc-300 italic">
            "{t("slogan")}"
          </p>
        </blockquote>
      </div>

      {/* Right side — white panel */}
      <div className="flex flex-col">
        <div className="hidden lg:flex items-center justify-end p-6">
          <LanguageSwitcher />
        </div>

        <div className="flex flex-1 items-center justify-center p-8">
          {isLogin ? (
            <Login onSwitch={() => setIsLogin(false)} />
          ) : (
            <CreateAccount onSwitch={() => setIsLogin(true)} />
          )}
        </div>

        <div className="flex lg:hidden justify-center pb-6">
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
}
