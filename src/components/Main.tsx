import { useStoreActions, useStoreState } from "../stores/store";
import Grid from "./Grid";

export default function Main() {
  const partOfDay = useStoreState((state) => state.partOfDay);
  const dayCount = useStoreState((state) => state.dayCount);
  const playerCurrency = useStoreState((state) => state.playerCurrency);
  const endTurn = useStoreActions((actions) => actions.endTurn);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <h1 style={{ textTransform: "uppercase" }}>
        {partOfDay} Day {dayCount}
      </h1>
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
