import { useState } from "react";
import cards from "../cards";

type CellData = { id: string; card: (typeof cards)[number]["name"] | null };
type CellRow = CellData[];
type GridData = CellRow[];

function generateDefaultGridData(gridSize: number): GridData {
  const data: GridData = [];
  for (let i = 0; i < gridSize; i++) {
    const row: CellRow = [];
    for (let j = 0; j < gridSize; j++) {
      row.push({
        id: `${i}${j}`,
        card:
          j % i === 1
            ? "Basic Plant"
            : j % 2 === 0
            ? "Great Oak"
            : "Purple Rose",
      });
    }
    data.push(row);
  }

  return data;
}

export default function useGridData(gridSize: number) {
  const [gridData, setGridData] = useState(() =>
    generateDefaultGridData(gridSize)
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
