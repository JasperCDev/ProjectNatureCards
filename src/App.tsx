import Grid from "./components/Grid";
import { useStoreState, useStoreActions } from "./stores/store";

import useGameLoop from "./utils/useGameLoop";

export default function App() {
  useGameLoop();
  const partOfDay = useStoreState((state) => state.partOfDay);
  const playerCurrency = useStoreState((state) => state.playerCurrency);
  const endTurn = useStoreActions((actions) => actions.endTurn);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        height: "90vh",
      }}
    >
      <h1 style={{ textTransform: "uppercase" }}>{partOfDay}</h1>
      <Grid />
      <div>
        <h2>PLAYER HAS {playerCurrency} COINS</h2>
      </div>
      <button style={{ padding: "1rem" }} onClick={() => endTurn()}>
        END TURN
      </button>
    </div>
  );
}
