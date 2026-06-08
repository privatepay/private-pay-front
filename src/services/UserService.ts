import { api } from "@/api/api";
import type { UpdateProfileDto } from "@/types/AuthorizationType";

export const userService = {
  changeLanguage: async (id: string, language: string): Promise<void> => {
    await api.patch(`/users/${id}/language`, { id, language });
  },

  updateProfile: async (id: string, data: UpdateProfileDto): Promise<void> => {
    await api.patch(`/users/${id}`, data);
  },
};
