import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GoogleIcon from "public/icons/GoogleIcon";
import MicrosoftIcon from "public/icons/MicrosoftIcon";
import AppleIcon from "public/icons/AppleIcon";

interface LoginProps {
  onSwitch: () => void;
}

export default function Login({ onSwitch }: LoginProps) {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex lg:hidden items-center justify-center gap-2 text-2xl font-medium pt-6 px-8">
        <LockKeyhole className="size-7" />
        Private Pay
      </div>

      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-sm space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              {t("login.title")}
            </h1>
            <p className="text-sm text-muted-foreground">
              {t("login.subtitle")}
            </p>
          </div>

          <div className="space-y-4">
            <Input
              type="email"
              placeholder={t("login.emailPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder={t("login.passwordPlaceholder")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button className="w-full">{t("login.submit")}</Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  {t("orContinueWith")}
                </span>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              <GoogleIcon />
              Google
            </Button>
            <Button variant="outline" className="w-full">
              <MicrosoftIcon />
              Microsoft
            </Button>
            <Button variant="outline" className="w-full">
              <AppleIcon />
              Apple
            </Button>
          </div>

          <p className="text-center text-xs text-muted-foreground">
            {t("login.noAccount")}{" "}
            <button
              onClick={onSwitch}
              className="underline underline-offset-4 hover:text-primary"
            >
              {t("login.switchToCreate")}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
