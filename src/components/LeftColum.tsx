import { Leaf } from "lucide-react";
import { useState } from "react";
import { useStoreActions, useStoreState } from "../stores/store";
import cards, { CardName } from "../utils/cards";
import styles from "./LeftColumn.module.scss";
import Card from "./Card";
import Dialog from "./Dialog";

function getRandomCards() {
  const cardNames = Object.values(cards)
    .filter((c) => c.purchasable)
    .map((c) => c.name);

  const randomCardNames: Array<CardName> = [];
  for (let i = 0; i < 3; i++) {
    const randomIndx = Math.floor(Math.random() * cardNames.length);
    randomCardNames.push(cardNames[randomIndx]);
    cardNames.splice(randomIndx, 0);
  }
  return randomCardNames.map((name) => cards[name]);
}

export default function LeftColumn() {
  const playerCurrency = useStoreState((state) => state.playerCurrency);
  const buyCard = useStoreActions((actions) => actions.buyCard);
  const cardsPurchased = useStoreState((state) => state.cardsPurchased);
  const cardPrice = Math.floor(5 * 1.2 ** cardsPurchased);
  const [cardsToBuy, setCardsToBuy] = useState<(typeof cards)[CardName][]>([]);

  const [pickingCard, setPickingCard] = useState(false);

  function openCardPack() {
    if (playerCurrency < cardPrice) {
      return;
    }

    setCardsToBuy(getRandomCards());
    setPickingCard(true);
  }

  function pickCard(card: (typeof cards)[CardName]) {
    if (playerCurrency < cardPrice) {
      return;
    }

    buyCard({ card, price: cardPrice });
    setCardsToBuy([]);
    setPickingCard(false);
  }

  return (
    <div style={{ width: "100%" }}>
      <Dialog
        open={pickingCard}
        setOpen={setPickingCard}
        trigger={
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
            onClick={() => openCardPack()}
          >
            <h2 style={{ margin: 0 }}>Purchase Card</h2>
            <Leaf size={100} color="green" fill="lightgreen" />
            <h3
              style={{
                color: playerCurrency < cardPrice ? "red" : "inherit",
                fontSize: "1rem",
              }}
            >
              {cardPrice} coins
            </h3>
          </div>
        }
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            // width: "100%",
            height: "500px",
            // justifyContent: "space-between",
            alignItems: "center",
            // margin: "5rem",
          }}
        >
          <h1 style={{ fontSize: "4rem", marginTop: "0" }}>Pick A Card</h1>
          <div style={{ display: "flex", height: "100%" }}>
            {cardsToBuy.map((card) => {
              return (
                <div className={styles.cardToBuy}>
                  <Card
                    onClick={() => pickCard(card)}
                    card={{
                      ...card,
                      health: card.lifespan,
                      turnCount: 0,
                      boughtFor: cardPrice,
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </Dialog>
    </div>
  );
}
