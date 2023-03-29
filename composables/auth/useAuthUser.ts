import type { UserWithoutPassword } from "~~/src/types/userTypes";

export const useAuthUser = () => {
  return useState<UserWithoutPassword | null>("user", () => null);
};
