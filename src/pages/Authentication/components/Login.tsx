import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LockKeyhole, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GoogleIcon from "@/components/icons/GoogleIcon";
import MicrosoftIcon from "@/components/icons/MicrosoftIcon";
import AppleIcon from "@/components/icons/AppleIcon";
import { useLogin } from "@/hooks/useAuth";
import type { ILoginUser } from "@/types/AuthorizationType";

interface LoginProps {
  onSwitch: () => void;
}

export default function Login({ onSwitch }: LoginProps) {
  const { t } = useTranslation();
  const [login, setLogin] = useState<ILoginUser>({ email: "", password: "" });

  const { loginUser, isPending, isError, error } = useLogin();

  const handleLogin = () => {
    loginUser(login);
  };

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
              value={login.email}
              onChange={(e) => setLogin({ ...login, email: e.target.value })}
              disabled={isPending}
            />
            <Input
              type="password"
              placeholder={t("login.passwordPlaceholder")}
              value={login.password}
              onChange={(e) => setLogin({ ...login, password: e.target.value })}
              disabled={isPending}
            />

            {isError && (
              <p className="text-xs text-destructive text-center">
                {error?.message}
              </p>
            )}

            <Button
              className="w-full"
              onClick={handleLogin}
              disabled={isPending}
            >
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {t("login.submit")}
            </Button>

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

            <Button variant="outline" className="w-full" disabled={isPending}>
              <GoogleIcon />
              Google
            </Button>
            <Button variant="outline" className="w-full" disabled={isPending}>
              <MicrosoftIcon />
              Microsoft
            </Button>
            <Button variant="outline" className="w-full" disabled={isPending}>
              <AppleIcon />
              Apple
            </Button>
          </div>

          <p className="text-center text-xs text-muted-foreground">
            {t("login.noAccount")}{" "}
            <button
              onClick={onSwitch}
              className="underline underline-offset-4 hover:text-primary"
              disabled={isPending}
            >
              {t("login.switchToCreate")}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
