import { createStore, StoreProvider } from "easy-peasy";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { model } from "./stores/store";

const store = createStore(model);

createRoot(document.getElementById("root") as HTMLElement).render(
  <StoreProvider store={store}>
    <App />
  </StoreProvider>
);
