import { createRoot } from "react-dom/client";
import { Root } from "./pages/Root";
import { makeStore } from "./state/makeStore";
import { StoreContext } from "./state/StoreContext";
import { StrictMode } from "react";
import { productionApi } from "../api/productionApi";

const store = makeStore(productionApi);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreContext.Provider value={store}>
      <Root />
    </StoreContext.Provider>
  </StrictMode>
);
