import { Diamond } from "lucide-react";
import { useStoreActions, useStoreState } from "../stores/store";
import cards, { CardName } from "../utils/cards";

export default function LeftColumn() {
  const playerCurrency = useStoreState((state) => state.playerCurrency);
  const buyCard = useStoreActions((actions) => actions.buyCard);

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
    const [card1] = randomCardNames.map((name) => cards[name]);
    buyCard({ card: card1, price: 5 });
    // buyCard({ card: card2, price: 0 });
    // buyCard({ card: card3, price: 0 });
  }
  return (
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
  );
}
