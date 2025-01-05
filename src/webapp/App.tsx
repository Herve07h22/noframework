import { createRoot } from "react-dom/client";
import { testApi } from "../server/testApi";
import { Root } from "./pages/Root";
import { makeStore } from "./state/makeStore";
import { StoreContext } from "./state/StoreContext";
import { StrictMode } from "react";

const store = makeStore(testApi);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreContext.Provider value={store}>
      <Root />
    </StoreContext.Provider>
  </StrictMode>
);
