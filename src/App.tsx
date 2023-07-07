import Grid from "./components/Grid";
import { useStoreState, useStoreActions } from "./stores/store";
import CardsInHand from "./components/CardsInHand";

import useGameLoop from "./utils/useGameLoop";
import { Diamond, Sword } from "lucide-react";
import cards, { CardName } from "./utils/cards";

export default function App() {
  useGameLoop();
  const partOfDay = useStoreState((state) => state.partOfDay);
  const dayCount = useStoreState((state) => state.dayCount);
  const playerCurrency = useStoreState((state) => state.playerCurrency);
  const playerAction = useStoreState((state) => state.playerAction);
  const endTurn = useStoreActions((actions) => actions.endTurn);
  const buyCard = useStoreActions((actions) => actions.buyCard);
  const updatePlayerAction = useStoreActions(
    (actions) => actions.updatePlayerAction
  );

  function onCardPurchase() {
    if (playerCurrency < 5) {
      return;
    }
    const cardNames = Object.keys(cards) as Array<CardName>;
    const randomCardNames: Array<CardName> = [];
    for (let i = 0; i < 3; i++) {
      const randomIndx = Math.floor(Math.random() * cardNames.length);
      randomCardNames.push(cardNames[randomIndx]);
      cardNames.splice(randomIndx, 0);
    }
    const [card1, card2, card3] = randomCardNames.map((name) => cards[name]);
    buyCard({ card: card1, price: 5 });
    // buyCard({ card: card2, price: 0 });
    // buyCard({ card: card3, price: 0 });
  }

  function handleSwordClick() {
    updatePlayerAction(playerAction === "killing card" ? null : "killing card");
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
            width: "150px",
            height: "175px",
            padding: "0.5rem",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            margin: "0.1rem",
            boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
          }}
          onClick={() => onCardPurchase()}
        >
          <h2 style={{ margin: 0 }}>Purchase Card</h2>
          <Diamond size={100} color="aquamarine" fill="lightgreen" />
          <h3
            style={{
              color: playerCurrency < 5 ? "red" : "inherit",
              fontSize: "1rem",
            }}
          >
            5 coins
          </h3>
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
      <div style={{ width: "100%" }}>
        <CardsInHand />
        <Sword
          size={playerAction === "killing card" ? 56 : 48}
          style={{
            fill: playerAction === "killing card" ? "red" : "grey",
            border:
              playerAction === "killing card" ? "3px solid crimson" : "none",
          }}
          onClick={handleSwordClick}
        />
      </div>
    </div>
  );
}
