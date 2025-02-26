import Node from "./Node";
import { GRID_SIZE } from "../utils/graph";
import { useSelector } from "react-redux";
export default function Grid() {
  const uiGrid = useSelector((state) => state.grid.ui);
  return (
    <div
      style={{
        width: uiGrid[0].length * GRID_SIZE,
        display: "grid",
        gridTemplateColumns: `repeat(${uiGrid[0].length}, 1fr)`,
      }}
    >
      {uiGrid.map((row, rowIdx) =>
        row.map((col, colIdx) => {
          return <Node status={col} rowIdx={rowIdx} colIdx={colIdx} />;
        })
      )}
    </div>
  );
}
