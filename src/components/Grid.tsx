import styles from "./Grid.module.scss";
import Card from "./Card";
import { useStoreState } from "../stores/store";

export default function Grid() {
  const gridData = useStoreState((state) => state.gridData);

  return (
    <div className={styles.grid}>
      {gridData.map((row, indx) => {
        return (
          <div key={indx} className={styles.row}>
            {row.map((cell) => {
              return (
                <div className={styles.cell} key={cell.id}>
                  {cell.card ? <Card card={cell.card} /> : null}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
