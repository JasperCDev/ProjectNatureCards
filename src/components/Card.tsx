import styles from "./Card.module.scss";
import { Leaf, Sparkles, Heart } from "lucide-react";

export default function Card() {
  return (
    <div className={styles.card}>
      <p className={styles.title}>Basic Plant</p>
      <div className={styles.face}>
        <Leaf size={48} />
      </div>
      <div className={styles.attributes}>
        <div className={styles.power}>
          <span className={styles.powerValue}>1</span>
          {"  "}
          <Sparkles className={styles.powerIcon} />
        </div>
        <div className={styles.health}>
          <span className={styles.healthValue}>3</span>{" "}
          <Heart className={styles.healthIcon} />
        </div>
      </div>
    </div>
  );
}
