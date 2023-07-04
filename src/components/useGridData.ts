import { useState } from "react";
import { StoreState, useStoreState } from "../stores/store";

type CellData = { id: string; card: StoreState["cardsInPlay"][number] | null };
type CellRow = CellData[];
type GridData = CellRow[];

function generateDefaultGridData(
  gridSize: number,
  cards: StoreState["cardsInPlay"]
): GridData {
  console.log("generateDefaultGridData");
  const data: GridData = [];
  for (let i = 0; i < gridSize; i++) {
    const row: CellRow = [];
    for (let j = 0; j < gridSize; j++) {
      const id = `${i}${j}`;
      const card = cards.find((c) => c.tileId == id);
      console.log("health ", card?.health);
      row.push({
        id,
        card: card || null,
      });
    }
    data.push(row);
  }

  return data;
}

export default function useGridData(gridSize: number) {
  const userCards = useStoreState((state) => state.cardsInPlay);

  const [gridData, setGridData] = useState(
    generateDefaultGridData(gridSize, userCards)
  );

  function getCellById(id: string) {
    for (let i = 0; i < gridData.length; i++) {
      for (let j = 0; j < gridData[i].length; j++) {
        const curr = gridData[i][j];
        const found = curr.id === id;
        if (found) {
          return {
            cell: curr,
            cellIndex: [Number(curr.id[0]), Number(curr.id[1])],
          };
        }
      }
    }

    throw Error("Cell ID DOES NOT EXIST");
  }

  function editCell(newCell: Partial<CellData> & { id: string }) {
    const { cell, cellIndex } = getCellById(newCell.id);

    const newGridData = [...gridData];
    const [i, j] = cellIndex;
    newGridData[i][j] = { ...cell, ...newCell };

    setGridData(newGridData);
  }

  return {
    data: gridData,
    editCell,
  };
}
