import { api } from "@/api/api";

export const userService = {
  changeLanguage: async (id: string, language: string): Promise<void> => {
    await api.patch(`/users/${id}/language`, { id, language });
  },
};
