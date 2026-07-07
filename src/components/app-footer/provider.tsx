import { AppFooterContext } from "./context";
import { ServicesProvider, type ServiceCode } from "../services";

export const AppFooterProvider = ({
  children,
  user,
  serviceCodes = [],
  onLogout,
}: {
  user: {
    username: string;
    email: string;
    isAdmin?: boolean;
  };
  serviceCodes?: ServiceCode[];
  onLogout: () => void;
  children: React.ReactNode;
}) => {
  return (
    <AppFooterContext.Provider
      value={{
        user,
        serviceCodes,
        onLogout,
      }}
    >
      <ServicesProvider serviceCodes={serviceCodes}>
        {children}
      </ServicesProvider>
    </AppFooterContext.Provider>
  );
};
