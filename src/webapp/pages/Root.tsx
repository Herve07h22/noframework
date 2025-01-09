import { useEffect } from "react";
import { RouteGuard } from "../components/contexts/RouteGuard";
import { Toast } from "../components/toast/Toast";
import { useStore } from "../state/StoreContext";
import { LoginPage } from "./LoginPage";
import { store } from "../state/makeStore";

export const Root = () => {
  const { router } = useStore();

  // Keep router in sync with the browser
  useEffect(() => {
    const handlePopState = () => store.router.navigate(window.location.pathname);
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [store]);

  useEffect(() => {
    window.history.pushState(null, "", router.currentPage)
  }, [router.currentPage]);

  return (
    <>
      {/* Public routes */}
      {router.match("/login", () => <LoginPage /> )}

      {/* Private routes */}
      <RouteGuard>
        {router.match("/dashboard", () => <p>This is the dashboard page</p> )}
        {router.match("/dashboard/:id", (params) => <p>Params is type-safe : {params.id}</p>)}
      </RouteGuard>

      {/* Fallback */}

      {/* Common components  : move them to a Layout component ? */}
      <Toast />
    </>
  );
};
