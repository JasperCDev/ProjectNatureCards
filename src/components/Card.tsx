import styles from "./Card.module.scss";
import { Sparkles, Heart } from "lucide-react";
import { Card } from "../utils/cards";
import CardIcon from "./CardIcon";
import { StoreState } from "../stores/store";

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
