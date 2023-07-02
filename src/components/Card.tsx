import styles from "./Card.module.scss";
import { Leaf, Sparkles, Heart } from "lucide-react";
import cards from "../cards";
import CardIcon from "./CardIcon";

type Props = {
  card: (typeof cards)[number];
};

export default function Card({ card }: Props) {
  return (
    <div className={styles.card}>
      <p className={styles.title}>{card.name}</p>
      <div className={styles.face}>
        <CardIcon name={card.name} />
      </div>
      <div className={styles.attributes}>
        <div className={styles.power}>
          <span className={styles.powerValue}>{card.power}</span>
          {"  "}
          <Sparkles className={styles.powerIcon} />
        </div>
        <div className={styles.health}>
          <span className={styles.healthValue}>{card.lifespan}</span>{" "}
          <Heart className={styles.healthIcon} />
        </div>
      </div>
    </div>
  );
}
