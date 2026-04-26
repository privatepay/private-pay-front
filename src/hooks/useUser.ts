import { userService } from "@/services/UserService";
import { authService } from "@/services/AuthorizationService";
import type { UserProfile } from "@/types/AuthorizationType";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useUser(user: UserProfile | undefined) {
  const userProfileQuery = useQuery({
    queryKey: ["userProfile", user?.sub],
    queryFn: () => authService.getProfile(),
    enabled: !!user,
  });

  const changeLanguageMutation = useMutation({
    mutationFn: (language: string) => {
      if (!user) throw new Error("User not authenticated");
      return userService.changeLanguage(user.sub, language);
    },
  });

  return {
    userProfile: userProfileQuery.data,
    changeLanguage: changeLanguageMutation.mutate,
    isChangingLanguage: changeLanguageMutation.isPending,
  };
}
