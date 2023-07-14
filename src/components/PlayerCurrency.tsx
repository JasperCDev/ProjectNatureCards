import { Sparkles } from "lucide-react";
import { useStoreState } from "../stores/store";
import styles from "./PlayerCurrency.module.scss";

export default function PlayerCurrency() {
  const playerCurrency = useStoreState((state) => state.playerCurrency);
  const rent = useStoreState((state) => state.rent);

  return (
    <div className={styles.playerCurrency}>
      <span
        className={styles.amount}
        style={{ color: playerCurrency >= rent ? "inherit" : "red" }}
      >
        {playerCurrency}
      </span>
      <span className={styles.rent}>/ {rent} </span>
      <Sparkles
        size={48}
        className={styles.powerIcon}
        color="darkorchid"
        fill="darkorchid"
      />
    </div>
  );
}
