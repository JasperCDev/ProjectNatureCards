import Grid from "./components/Grid";
import { useStoreState, useStoreActions } from "./stores/store";
import CardsInHand from "./components/CardsInHand";

import useGameLoop from "./utils/useGameLoop";
import { Sword } from "lucide-react";
import cards, { CardName } from "./utils/cards";
import CardIcon from "./components/CardIcon";

export default function App() {
  useGameLoop();
  const partOfDay = useStoreState((state) => state.partOfDay);
  const dayCount = useStoreState((state) => state.dayCount);
  const cardsPurchased = useStoreState((state) => state.cardsPurchased);
  const playerCurrency = useStoreState((state) => state.playerCurrency);
  const playerAction = useStoreState((state) => state.playerAction);
  const endTurn = useStoreActions((actions) => actions.endTurn);
  const buyCard = useStoreActions((actions) => actions.buyCard);
  const updatePlayerAction = useStoreActions(
    (actions) => actions.updatePlayerAction
  );

  function onCardPurchase(card: (typeof cards)[CardName], price: number) {
    if (playerCurrency < card.price) return;
    buyCard({ card, price });
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
        {Object.values(cards).map((card) => {
          const cardPrice = card.price;
          return (
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
              onClick={() => onCardPurchase(card, cardPrice)}
            >
              <h2>Purchase {card.name}</h2>
              <CardIcon name={card.name} />
              <h3
                style={{
                  color: playerCurrency < cardPrice ? "red" : "inherit",
                }}
              >
                {cardPrice} coins
              </h3>
            </div>
          );
        })}
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
