import { createContext } from "react";
import type { ServiceCode } from "../services";

export type AppFooterContextType = {
  user: {
    username: string;
    email: string;
    isAdmin?: boolean;
  };
  serviceCodes: ServiceCode[];
  onServiceClick?: (code: ServiceCode) => void;
  onViewAllServices?: () => void;
  onLogout: () => void;
  onSettings: () => void;
};

export const AppFooterContext = createContext<AppFooterContextType>({
  user: {
    username: "",
    email: "",
    isAdmin: false,
  },
  serviceCodes: [],
  onLogout: () => {},
  onSettings: () => {},
});
