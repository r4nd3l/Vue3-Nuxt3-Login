import type { UserWithoutPassword } from "~~/src/types/types";

export const useAuthUser = () => {
  return useState<UserWithoutPassword | null>("user", () => null);
};
