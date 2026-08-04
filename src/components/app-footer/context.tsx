import { createContext } from "react";
import type { ServiceCode } from "../services";

export type AppFooterContextType = {
  user: {
    username: string;
    email: string;
    isAdmin?: boolean;
  };
  serviceCodes: ServiceCode[];
  organizationId?: number | undefined;
  onServiceClick?: (code: ServiceCode) => void;
  onViewAllServices?: () => void;
  onLogout: () => void;
};

export const AppFooterContext = createContext<AppFooterContextType>({
  user: {
    username: "",
    email: "",
    isAdmin: false,
  },
  serviceCodes: [],
  onLogout: () => {},
});
