import { createStore, StoreProvider } from "easy-peasy";
import Grid from "./components/Grid";
import { model } from "./stores/cardsStore";

export default function App() {
  const store = createStore(model);
  return (
    <StoreProvider store={store}>
      <Grid />
    </StoreProvider>
  );
}
