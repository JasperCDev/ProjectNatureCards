import { Leaf } from "lucide-react";
import { useStoreActions, useStoreState } from "../stores/store";
import cards from "../utils/cards";

export default function LeftColumn() {
  const playerCurrency = useStoreState((state) => state.playerCurrency);
  const buyCard = useStoreActions((actions) => actions.buyCard);
  const plantsPurchased = useStoreState((state) => state.plantsPurchased);
  const buildingsPurchased = useStoreState((state) => state.buildingsPurchased);
  const plantPrice = Math.floor(5 + 1 * plantsPurchased);
  const buildingPrice = Math.floor(25 + 5 * buildingsPurchased);

  function onPlantPurchase() {
    if (playerCurrency < plantPrice) {
      return;
    }
    const includedCards = Object.values(cards).filter(
      (c) => c.price !== -1 && c.type === "plant"
    );
    const randomIndx = Math.floor(Math.random() * includedCards.length);
    const randomCard = includedCards[randomIndx];
    buyCard({ card: randomCard, price: plantPrice });
  }

  function onBuildingPurchase() {
    if (playerCurrency < buildingPrice) {
      return;
    }
    const includedCards = Object.values(cards).filter(
      (c) => c.price !== -1 && c.type === "building"
    );
    const randomIndx = Math.floor(Math.random() * includedCards.length);
    const randomCard = includedCards[randomIndx];
    buyCard({ card: randomCard, price: buildingPrice });
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
        onClick={() => onPlantPurchase()}
      >
        <h2 style={{ margin: 0 }}>Purchase Plant</h2>
        <Leaf size={100} color="green" fill="lightgreen" />
        <h3
          style={{
            color: playerCurrency < plantPrice ? "red" : "inherit",
            fontSize: "1rem",
          }}
        >
          {plantPrice} coins
        </h3>
      </div>
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
        onClick={() => onBuildingPurchase()}
      >
        <h2 style={{ margin: 0 }}>Purchase Building</h2>
        <Leaf size={100} color="green" fill="lightgreen" />
        <h3
          style={{
            color: playerCurrency < buildingPrice ? "red" : "inherit",
            fontSize: "1rem",
          }}
        >
          {buildingPrice} coins
        </h3>
      </div>
    </div>
  );
}
