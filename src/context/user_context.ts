import { createContext } from "react";
import { UserContextValue } from "../data/dto/user_context_type";

export const userContext = createContext<UserContextValue>({
  user: null,
  token: "",
  setUser: () => {},
  setTokenToLocal: () => {},
});
