import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GoogleIcon from "@/components/icons/GoogleIcon";
import PasswordStrength from "@/pages/Authentication/components/PasswordStrength";
import { useRegister } from "@/hooks/useAuth";
import { DocumentType, Role } from "@/types/AuthorizationType";
import type { TFunction } from "i18next";
import { formatDocument } from "@/utils/utils";

function createSchema(t: TFunction) {
  return z.object({
    firstName: z.string().min(2, t("validation.firstNameMin")),
    lastName: z.string().min(2, t("validation.lastNameMin")),
    email: z.email(t("validation.emailInvalid")),
    document: z
      .string()
      .min(11, t("validation.documentInvalid"))
      .max(14, t("validation.documentInvalid")),
    documentType: z.enum([DocumentType.CPF, DocumentType.CNPJ]),
    password: z
      .string()
      .min(8, t("validation.passwordMin"))
      .regex(/[A-Z]/, t("validation.passwordUppercase"))
      .regex(/[a-z]/, t("validation.passwordLowercase"))
      .regex(/[^A-Za-z0-9]/, t("validation.passwordSpecial")),
  });
}

type FormData = z.infer<ReturnType<typeof createSchema>>;

interface CreateAccountProps {
  onSwitch: () => void;
}

export default function CreateAccount({ onSwitch }: CreateAccountProps) {
  const { t, i18n } = useTranslation();
  const { registerUser, isPending, isError, error } = useRegister();

  const schema = useMemo(() => createSchema(t), [t]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      documentType: DocumentType.CPF,
      document: "",
    },
  });

  const password = useWatch({ control, name: "password" });
  const documentType = useWatch({ control, name: "documentType" });

  const onSubmit = (data: FormData) => {
    registerUser({ ...data, role: Role.USER, language: i18n.language });
  };

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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label htmlFor="firstName">{t("createAccount.firstName")}</Label>
            <Input
              id="firstName"
              placeholder={t("createAccount.firstNamePlaceholder")}
              disabled={isPending}
              aria-invalid={!!errors.firstName}
              {...register("firstName")}
            />
            {errors.firstName && (
              <p className="text-xs text-destructive">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="lastName">{t("createAccount.lastName")}</Label>
            <Input
              id="lastName"
              placeholder={t("createAccount.lastNamePlaceholder")}
              disabled={isPending}
              aria-invalid={!!errors.lastName}
              {...register("lastName")}
            />
            {errors.lastName && (
              <p className="text-xs text-destructive">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="email">{t("createAccount.email")}</Label>
          <Input
            id="email"
            type="email"
            placeholder={t("createAccount.emailPlaceholder")}
            disabled={isPending}
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="document">{t("createAccount.document")}</Label>
          <div className="flex gap-2">
            <select
              className="flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs"
              disabled={isPending}
              {...register("documentType")}
            >
              <option value={DocumentType.CPF}>CPF</option>
              <option value={DocumentType.CNPJ}>CNPJ</option>
            </select>
            <Controller
              control={control}
              name="document"
              render={({ field }) => (
                <Input
                  id="document"
                  placeholder={t("createAccount.documentPlaceholder")}
                  disabled={isPending}
                  className="flex-1"
                  value={formatDocument(field.value ?? "", documentType)}
                  onChange={(e) =>
                    field.onChange(e.target.value.replace(/\D/g, ""))
                  }
                  onBlur={field.onBlur}
                  aria-invalid={!!errors.document}
                />
              )}
            />
          </div>
          {errors.document && (
            <p className="text-xs text-destructive">
              {errors.document.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="password">{t("createAccount.password")}</Label>
          <Input
            id="password"
            type="password"
            placeholder={t("createAccount.passwordPlaceholder")}
            disabled={isPending}
            aria-invalid={!!errors.password}
            {...register("password")}
          />
          <PasswordStrength password={password ?? ""} />
          {errors.password && (
            <p className="text-xs text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>

        {isError && (
          <p className="text-xs text-destructive text-center">
            {(error as Error).message}
          </p>
        )}

        <Button type="submit" className="w-full" disabled={isPending}>
          {t("createAccount.submit")}
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

        <Button
          type="button"
          variant="outline"
          className="w-full"
          disabled={isPending}
        >
          <GoogleIcon />
          Google
        </Button>
      </form>

      <p className="text-center text-xs text-muted-foreground">
        {t("createAccount.hasAccount")}{" "}
        <button
          onClick={onSwitch}
          className="underline underline-offset-4 hover:text-primary"
          disabled={isPending}
        >
          {t("createAccount.switchToLogin")}
        </button>
      </p>
    </div>
  );
}
