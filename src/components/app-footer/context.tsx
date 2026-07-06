import { createContext } from "react";

export type AppFooterContextType = {
  user: {
    username: string;
    email: string;
    isAdmin?: boolean;
  };
  onLogout: () => void;
  onSettings: () => void;
};

export const AppFooterContext = createContext<AppFooterContextType>({
  user: {
    username: "",
    email: "",
    isAdmin: false,
  },
  onLogout: () => {},
  onSettings: () => {},
});
