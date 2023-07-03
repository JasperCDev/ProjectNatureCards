import styles from "./Card.module.scss";
import { Leaf, Sparkles, Heart } from "lucide-react";
import cards, { Card } from "../cards";
import CardIcon from "./CardIcon";
import { StoreState } from "../stores/cardsStore";

type Props = {
  card: StoreState["cards"][number];
};

export default function Card({ card }: Props) {
  return (
    <div className={styles.card}>
      <p className={styles.title}>{card.card}</p>
      <div className={styles.face}>
        <CardIcon name={card.card} />
      </div>
      <div className={styles.attributes}>
        <div className={styles.power}>
          <span className={styles.powerValue}>{card.power}</span>
          {"  "}
          <Sparkles className={styles.powerIcon} />
        </div>
        <div className={styles.health}>
          <span className={styles.healthValue}>{card.health}</span>{" "}
          <Heart className={styles.healthIcon} />
        </div>
      </div>
    </div>
  );
}
