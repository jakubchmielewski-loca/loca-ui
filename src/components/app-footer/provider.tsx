import { AppFooterContext } from "./context";
import { ServicesProvider, type ServiceCode } from "../services";

export const AppFooterProvider = ({
  children,
  user,
  serviceCodes = [],
  organizationId,
  onLogout,
}: {
  user: {
    username: string;
    email: string;
    isAdmin?: boolean;
  };
  serviceCodes?: ServiceCode[];
  organizationId?: number;
  onLogout: () => void;
  children: React.ReactNode;
}) => {
  return (
    <AppFooterContext.Provider
      value={{
        user,
        serviceCodes,
        organizationId,
        onLogout,
      }}
    >
      <ServicesProvider
        serviceCodes={serviceCodes}
        {...(organizationId !== undefined ? { organizationId } : {})}
      >
        {children}
      </ServicesProvider>
    </AppFooterContext.Provider>
  );
};
