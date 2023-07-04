import Grid from "./components/Grid";
import { useStoreState, useStoreActions } from "./stores/store";
import CardsInHand from "./components/CardsInHand";

import useGameLoop from "./utils/useGameLoop";

export default function App() {
  useGameLoop();
  const partOfDay = useStoreState((state) => state.partOfDay);
  const playerCurrency = useStoreState((state) => state.playerCurrency);
  const endTurn = useStoreActions((actions) => actions.endTurn);
  const addRandomCard = useStoreActions((actions) => actions.addRandomCard);

  function onCardPurchase() {
    addRandomCard();
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <div style={{ width: "100%" }}>
        <div
          style={{
            border: "1px solid black",
            width: "120px",
            height: "150px",
            padding: "1rem",
          }}
          onClick={onCardPurchase}
        >
          <h2>Purchase a Card!</h2>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
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
      <div style={{ width: "100%" }}>
        <CardsInHand />
      </div>
    </div>
  );
}
