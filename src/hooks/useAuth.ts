import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authService } from "@/services/AuthorizationService";
import type { ILoginUser, IRegisterUser } from "@/types/AuthorizationType";

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => authService.getProfile(),
    retry: false,
  });
}

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: (credentials: ILoginUser) => authService.login(credentials),
    onSuccess: (user) => {
      queryClient.setQueryData(["profile"], user);
      navigate("/home");
    },
  });

  return {
    loginUser: loginMutation.mutate,
    isPending: loginMutation.isPending,
    isError: loginMutation.isError,
    error: loginMutation.error,
  };
}

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logoutMutation = useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["profile"] });
      navigate("/");
    },
  });

  return {
    logoutUser: logoutMutation.mutate,
    isPending: logoutMutation.isPending,
    isError: logoutMutation.isError,
    error: logoutMutation.error,
  };
}

export function useRegister() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationFn: async (userData: IRegisterUser) => {
      await authService.register(userData);
      return authService.login({ email: userData.email, password: userData.password });
    },
    onSuccess: (user) => {
      queryClient.setQueryData(["profile"], user);
      navigate("/home");
    },
  });

  return {
    registerUser: registerMutation.mutate,
    isPending: registerMutation.isPending,
    isError: registerMutation.isError,
    error: registerMutation.error,
  };
}

export function useAuth() {
  const login = useLogin();
  const register = useRegister();
  const profile = useProfile();
  const logout = useLogout();

  return {
    ...login,
    ...register,
    ...profile,
    ...logout,
  };
}
