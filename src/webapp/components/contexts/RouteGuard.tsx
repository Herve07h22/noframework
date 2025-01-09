import { useStore } from "../../state/StoreContext";

export const RouteGuard = ({ children }: { children: React.ReactNode }) => {
  const { auth } = useStore();

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  return auth.check() ? <>{children}</> : null;
};
