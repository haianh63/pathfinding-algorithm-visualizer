import { motion } from "motion/react";
import { GRID_SIZE } from "../utils/graph";
import { useDispatch } from "react-redux";
import { actions } from "../store/grid-slice";
const color = {
  None: "white",
  Visited: "#93c5fd",
  "Correct-Path": "#facc15",
  Block: "#374151",
  Start: "#22c55e",
  End: "#ef4444",
};

export default function Node({ status, rowIdx, colIdx }) {
  const dispatch = useDispatch();
  const handleMouseEnter = (event) => {
    if (event.buttons === 1) {
      if (status != "Start" && status != "End") {
        dispatch(
          actions.makeBlock({
            row: rowIdx,
            col: colIdx,
          })
        );
      }
    }
  };
  return (
    <motion.div
      style={{
        width: GRID_SIZE,
        height: GRID_SIZE,
        border: "1px solid #d1d5db",
        borderRadius: 1,
      }}
      animate={{
        backgroundColor: color[status],
        transition: { duration: 0.7, ease: "easeInOut" },
      }}
      whileHover={{ scale: 1.1 }}
      onMouseEnter={handleMouseEnter}
      onMouseDown={() => {
        dispatch(
          actions.makeBlock({
            row: rowIdx,
            col: colIdx,
          })
        );
      }}
    ></motion.div>
  );
}
