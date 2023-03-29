import { User } from "~~/src/types/userTypes";

declare module "h3" {
  interface H3EventContext {
    user?: User;
  }
}

export {};
