import styles from "./Card.module.scss";
import { Sparkles, Heart } from "lucide-react";
import { Card } from "../utils/cards";
import CardIcon from "./CardIcon";
import { CardInHand, CardInPlay, CellData } from "../stores/store";
import * as React from "react";
import * as classNames from "classnames";

type Props = {
  cell?: CellData;
  card: CardInHand | CardInPlay;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  className?: string;
};

export default function Card({ card, onClick, className, cell }: Props) {
  const cardClassName = classNames(className, {
    [styles.card]: true,
  });

  const isEmpowered = cell?.effects.includes("fire");

  return (
    <div onClick={onClick} className={cardClassName}>
      <p className={styles.title}>{card.name}</p>
      <div className={styles.face}>
        <CardIcon name={card.name} />
      </div>
      <div className={styles.attributes}>
        {card.power !== -1 ? (
          <div className={styles.power}>
            <span
              className={styles.powerValue}
              style={{ color: isEmpowered ? "red" : "inherit" }}
            >
              {isEmpowered ? card.power * 2 : card.power}
            </span>
            {"  "}
            <Sparkles className={styles.powerIcon} />
          </div>
        ) : null}
        {card.health !== -1 ? (
          <div className={styles.health}>
            <span className={styles.healthValue}>{card.health}</span>{" "}
            <Heart className={styles.healthIcon} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
