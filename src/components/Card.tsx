import styles from "./Card.module.scss";
import { Sparkles, Heart } from "lucide-react";
import { Card } from "../utils/cards";
import CardIcon from "./CardIcon";
import { CardInHand, CardInPlay } from "../stores/store";
import * as React from "react";
import * as classNames from "classnames";

type Props = {
  card: CardInHand | CardInPlay;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  className?: string;
};

export default function Card({ card, onClick, className }: Props) {
  const cardClassName = classNames(className, {
    [styles.card]: true,
  });

  return (
    <div onClick={onClick} className={cardClassName}>
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
          <span className={styles.healthValue}>{card.health}</span>{" "}
          <Heart className={styles.healthIcon} />
        </div>
      </div>
    </div>
  );
}
