import { AppFooterContext } from "./context";

export const AppFooterProvider = ({
  children,
  user,
  onLogout,
  onSettings,
}: {
  user: {
    username: string;
    email: string;
    isAdmin?: boolean;
  };
  onLogout: () => void;
  onSettings: () => void;
  children: React.ReactNode;
}) => {
  return (
    <AppFooterContext.Provider value={{ user, onLogout, onSettings }}>
      {children}
    </AppFooterContext.Provider>
  );
};
