import { useTranslation } from "react-i18next";

const rules = [
  { key: "minLength", test: (v: string) => v.length >= 8 },
  { key: "uppercase", test: (v: string) => /[A-Z]/.test(v) },
  { key: "lowercase", test: (v: string) => /[a-z]/.test(v) },
  { key: "special", test: (v: string) => /[^A-Za-z0-9]/.test(v) },
];

const strengthColors = ["", "bg-red-500", "bg-orange-400", "bg-yellow-400", "bg-green-500"];
const strengthTextColors = ["", "text-red-500", "text-orange-400", "text-yellow-500", "text-green-500"];

interface PasswordStrengthProps {
  password: string;
}

export default function PasswordStrength({ password }: PasswordStrengthProps) {
  const { t } = useTranslation();

  if (!password) return null;

  const passed = rules.filter((r) => r.test(password));
  const strength = passed.length;

  return (
    <div className="space-y-2 mt-1">
      <div className="flex gap-1">
        {rules.map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
              i < strength ? strengthColors[strength] : "bg-muted"
            }`}
          />
        ))}
      </div>

      <p className={`text-xs font-medium ${strengthTextColors[strength]}`}>
        {t(`passwordStrength.levels.${strength}`)}
      </p>

      <ul className="space-y-0.5">
        {rules.map((rule) => (
          <li
            key={rule.key}
            className={`text-xs flex items-center gap-1.5 ${
              rule.test(password) ? "text-green-500" : "text-muted-foreground"
            }`}
          >
            <span>{rule.test(password) ? "✓" : "○"}</span>
            {t(`passwordStrength.rules.${rule.key}`)}
          </li>
        ))}
      </ul>
    </div>
  );
}
