import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GoogleIcon from "public/icons/GoogleIcon";

interface CreateAccountProps {
  onSwitch: () => void;
}

export default function CreateAccount({ onSwitch }: CreateAccountProps) {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");

  return (
    <div className="w-full max-w-sm space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          {t("createAccount.title")}
        </h1>
        <p className="text-sm text-muted-foreground">
          {t("createAccount.subtitle")}
        </p>
      </div>

      <div className="space-y-4">
        <Input
          type="email"
          placeholder={t("createAccount.emailPlaceholder")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button className="w-full">{t("createAccount.submit")}</Button>

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
      </div>

      <p className="text-center text-xs text-muted-foreground">
        {t("createAccount.hasAccount")}{" "}
        <button
          onClick={onSwitch}
          className="underline underline-offset-4 hover:text-primary"
        >
          {t("createAccount.switchToLogin")}
        </button>
      </p>
    </div>
  );
}
