import { User } from "~~/src/types/types";

declare module "h3" {
  interface H3EventContext {
    user?: User;
  }
}

export {};
