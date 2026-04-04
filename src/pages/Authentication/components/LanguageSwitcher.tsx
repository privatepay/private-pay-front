import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = i18n.language?.startsWith("pt") ? "pt" : "en";

  return (
    <div className="flex items-center gap-1 rounded-full border p-1">
      <button
        onClick={() => i18n.changeLanguage("pt")}
        title="Português"
        className={`rounded-full p-1 transition-opacity ${
          current === "pt" ? "opacity-100" : "opacity-40 hover:opacity-70"
        }`}
      >
        <span className="text-xl leading-none">🇧🇷</span>
      </button>
      <button
        onClick={() => i18n.changeLanguage("en")}
        title="English"
        className={`rounded-full p-1 transition-opacity ${
          current === "en" ? "opacity-100" : "opacity-40 hover:opacity-70"
        }`}
      >
        <span className="text-xl leading-none">🇺🇸</span>
      </button>
    </div>
  );
}
