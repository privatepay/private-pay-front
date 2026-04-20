import { api } from "@/api/api";
import type { ILoginUser, IRegisterUser } from "@/types/AuthorizationType";

export interface User {
  id: string;
  email: string;
}

export const authService = {
  login: async (data: ILoginUser): Promise<User> => {
    const response = await api.post<User>("/auth/login", data);
    return response.data;
  },

  getProfile: async (): Promise<User> => {
    const response = await api.get<User>("/auth/profile");
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
