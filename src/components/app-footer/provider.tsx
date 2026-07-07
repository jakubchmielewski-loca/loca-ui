import { AppFooterContext } from "./context";
import { ServicesProvider, type ServiceCode } from "../services";

export const AppFooterProvider = ({
  children,
  user,
  serviceCodes = [],
  onServiceClick,
  onViewAllServices,
  onLogout,
  onSettings,
}: {
  user: {
    username: string;
    email: string;
    isAdmin?: boolean;
  };
  serviceCodes?: ServiceCode[];
  onServiceClick?: (code: ServiceCode) => void;
  onViewAllServices?: () => void;
  onLogout: () => void;
  onSettings: () => void;
  children: React.ReactNode;
}) => {
  return (
    <AppFooterContext.Provider
      value={{
        user,
        serviceCodes,
        onLogout,
        onSettings,
        ...(onServiceClick !== undefined ? { onServiceClick } : {}),
        ...(onViewAllServices !== undefined ? { onViewAllServices } : {}),
      }}
    >
      <ServicesProvider
        serviceCodes={serviceCodes}
        {...(onServiceClick !== undefined ? { onServiceClick } : {})}
        {...(onViewAllServices !== undefined ? { onViewAll: onViewAllServices } : {})}
      >
        {children}
      </ServicesProvider>
    </AppFooterContext.Provider>
  );
};
