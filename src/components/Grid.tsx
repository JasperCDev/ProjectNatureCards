import styles from "./Grid.module.scss";
import Card from "./Card";
import { CellData, useStoreActions, useStoreState } from "../stores/store";

export default function Grid() {
  const gridData = useStoreState((state) => state.gridData);
  const cardSelected = useStoreState((state) => state.cardSelected);
  const placeCard = useStoreActions((actions) => actions.placeCard);

  function handleCellClick(cell: CellData) {
    if (cell.card !== null) return;
    if (cardSelected === null) return;
    placeCard({ cardId: cardSelected, cellId: cell.id });
  }

  return (
    <div className={styles.grid}>
      {gridData.map((row, indx) => {
        return (
          <div key={indx} className={styles.row}>
            {row.map((cell) => {
              return (
                <div
                  onClick={() => handleCellClick(cell)}
                  className={styles.cell}
                  key={cell.id}
                >
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
