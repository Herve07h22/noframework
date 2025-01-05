import { Toast } from "../components/toast/Toast";
import { useStore } from "../state/StoreContext";
import { LoginPage } from "./LoginPage";


export const Root = () => {
  const {router} = useStore();

  return (
    <>
      {/* TODO switch to router.currentPage */}
     <LoginPage />
     <Toast />
    </>
  );
};
