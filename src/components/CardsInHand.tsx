import Card from "./Card";
import { CardInHand, useStoreState, useStoreActions } from "../stores/store";
import * as classNames from "classnames";
import styles from "./CardsInHand.module.scss";

function CardInHand({ card }: { card: CardInHand }) {
  const cardSelected = useStoreState((state) => state.cardSelected);
  const selectCard = useStoreActions((state) => state.selectCard);
  const cardClassName = classNames({
    [styles.card]: true,
    [styles.selected]: cardSelected === card.id,
  });

  function handleCardSelect() {
    selectCard(card.id);
  }

  return (
    <Card className={cardClassName} onClick={handleCardSelect} card={card} />
  );
}

export default function CardsInHand() {
  const cardsInHand = useStoreState((state) => state.cardsInHand);
  return (
    <div className={styles.cardsInHand}>
      {cardsInHand.map((card) => {
        return <CardInHand key={card.id} card={card} />;
      })}
    </div>
  );
}
