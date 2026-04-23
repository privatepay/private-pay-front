import { userService } from "@/services/UserService";
import type { UserProfile } from "@/types/AuthorizationType";
import { useMutation } from "@tanstack/react-query";

export function useUser(user: UserProfile | undefined) {
  const changeLanguageMutation = useMutation({
    mutationFn: (language: string) => {
      if (!user) throw new Error("User not authenticated");
      return userService.changeLanguage(user.sub, language);
    },
  });

  return {
    changeLanguage: changeLanguageMutation.mutate,
    isChangingLanguage: changeLanguageMutation.isPending,
  };
}
