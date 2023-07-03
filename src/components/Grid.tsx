/* eslint-disable @typescript-eslint/no-non-null-assertion */
import useGridData from "./useGridData";
import styles from "./Grid.module.scss";
import Card from "./Card";
import cards from "../cards";

export default function Grid() {
  const { data, editCell } = useGridData(3);

  function handleCellClick(cell: (typeof data)[number][number]) {
    // editCell({ id: cell.id });
  }

  return (
    <div className={styles.grid}>
      {data.map((row, indx) => {
        return (
          <div key={indx} className={styles.row}>
            {row.map((cell) => {
              return (
                <div
                  className={styles.cell}
                  onClick={() => handleCellClick(cell)}
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
