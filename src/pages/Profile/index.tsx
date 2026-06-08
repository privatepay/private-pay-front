import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { useProfile, useUpdateProfile } from "@/hooks/useAuth";
import LanguageSwitcher from "@/pages/Authentication/components/LanguageSwitcher";
import PasswordStrength from "@/pages/Authentication/components/PasswordStrength";

type ProfileForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export default function Profile() {
  const { t } = useTranslation();
  const { data: profile } = useProfile();
  const { updateProfile, isPending, isSuccess } = useUpdateProfile();
  const [showPassword, setShowPassword] = useState(false);

  const schema = z.object({
    firstName: z.string().min(1, t("profile.validation.required")),
    lastName: z.string().min(1, t("profile.validation.required")),
    email: z.email(t("profile.validation.emailInvalid")),
    password: z
      .string()
      .refine(
        (val) => val === "" || val.length >= 8,
        t("validation.passwordMin"),
      )
      .refine(
        (val) => val === "" || /[A-Z]/.test(val),
        t("validation.passwordUppercase"),
      )
      .refine(
        (val) => val === "" || /[a-z]/.test(val),
        t("validation.passwordLowercase"),
      )
      .refine(
        (val) => val === "" || /[^A-Za-z0-9]/.test(val),
        t("validation.passwordSpecial"),
      ),
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ProfileForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: profile?.firstName ?? "",
      lastName: profile?.lastName ?? "",
      email: profile?.email ?? "",
      password: "",
    },
  });

  useEffect(() => {
    if (profile) {
      reset(
        {
          firstName: profile.firstName ?? "",
          lastName: profile.lastName ?? "",
          email: profile.email ?? "",
          password: "",
        },
        { keepDirtyValues: true },
      );
    }
  }, [profile, reset]);

  console.log("profile:", profile);

  const password = useWatch({ control, name: "password" });

  const onSubmit = (data: ProfileForm) => updateProfile(data);

  const initials =
    profile?.firstName && profile?.lastName
      ? `${profile.firstName.charAt(0)}${profile.lastName.charAt(0)}`.toUpperCase()
      : "?";

  return (
    <>
      <div className="flex justify-between mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            {t("profile.title")}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            {t("profile.subtitle")}
          </p>
        </div>
        <div className="sm:hidden">
          <LanguageSwitcher />
        </div>
      </div>

      <div className="flex w-full flex-col gap-6">
        <Card className="bg-gradient-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                  {initials}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-lg font-semibold text-foreground">
                    {profile?.firstName} {profile?.lastName}
                  </p>
                  <p className="truncate text-sm text-muted-foreground">
                    {profile?.email}
                  </p>
                  {profile?.codename && (
                    <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                      <Lock className="h-3 w-3 shrink-0" />
                      <span className="font-mono">{profile.codename}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="hidden sm:block">
                <LanguageSwitcher />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-base">{t("profile.section")}</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-5"
            >
              <Field>
                <FieldLabel>{t("profile.codename")}</FieldLabel>
                <div className="relative">
                  <Input
                    value={profile?.codename ?? "—"}
                    readOnly
                    disabled
                    className="cursor-not-allowed pr-10 font-mono"
                  />
                  <Lock className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground">
                  {t("profile.codenameHint")}
                </p>
              </Field>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field>
                  <FieldLabel>{t("profile.firstName")}</FieldLabel>
                  <Input
                    placeholder={t("profile.firstNamePlaceholder")}
                    aria-invalid={!!errors.firstName}
                    {...register("firstName")}
                  />
                  <FieldError errors={[errors.firstName]} />
                </Field>
                <Field>
                  <FieldLabel>{t("profile.lastName")}</FieldLabel>
                  <Input
                    placeholder={t("profile.lastNamePlaceholder")}
                    aria-invalid={!!errors.lastName}
                    {...register("lastName")}
                  />
                  <FieldError errors={[errors.lastName]} />
                </Field>
              </div>

              <Field>
                <FieldLabel>{t("profile.email")}</FieldLabel>
                <Input
                  type="email"
                  placeholder={t("profile.emailPlaceholder")}
                  aria-invalid={!!errors.email}
                  {...register("email")}
                />
                <FieldError errors={[errors.email]} />
              </Field>

              <Field>
                <FieldLabel>{t("profile.newPassword")}</FieldLabel>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder={t("profile.passwordPlaceholder")}
                    aria-invalid={!!errors.password}
                    className="pr-10"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <FieldError errors={[errors.password]} />
                <PasswordStrength password={password} />
              </Field>

              {/* <Field>
                
              </Field> */}

              <div className="flex items-center justify-end gap-3 pt-2">
                {isSuccess && (
                  <p className="text-sm text-success">
                    {t("profile.saveSuccess")}
                  </p>
                )}
                <Button type="submit" disabled={isPending}>
                  {isPending ? t("profile.saving") : t("profile.save")}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
