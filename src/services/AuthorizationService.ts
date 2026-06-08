import { api } from "@/api/api";
import type {
  ILoginUser,
  IRegisterUser,
  UserProfile,
} from "@/types/AuthorizationType";

export const authService = {
  login: async (data: ILoginUser): Promise<UserProfile> => {
    const response = await api.post<UserProfile>("/auth/login", data);
    return response.data;
  },

  getProfile: async (): Promise<UserProfile> => {
    const response = await api.get<UserProfile>("/auth/profile");
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post("/auth/logout");
  },

  register: async (data: IRegisterUser): Promise<IRegisterUser> => {
    const response = await api.post<IRegisterUser>("/users", data);
    return response.data;
  },
};
