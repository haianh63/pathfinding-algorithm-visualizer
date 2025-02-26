import { createSlice } from "@reduxjs/toolkit";
import { generateGrid, generateUIGrid } from "../utils/grid";
const m = 15;
const n = 20;
const initialState = {
  actualGrid: generateGrid(m, n),
  ui: generateUIGrid(m, n),
  isVisualizing: false,
  isReset: true,
};
const gridSlice = createSlice({
  name: "grid",
  initialState,
  reducers: {
    changeStatus(state, action) {
      const rowIdx = action.payload.row;
      const colIdx = action.payload.col;
      state.ui[rowIdx][colIdx] = action.payload.status;
    },
    reset(state) {
      for (let i = 0; i < state.ui.length; ++i) {
        for (let j = 0; j < state.ui[0].length; ++j) {
          state.actualGrid[i][j].isBlock = false;
          if (i === 0 && j === 0) {
            state.ui[i][j] = "Start";
            continue;
          }
          if (i === state.ui.length - 1 && j === state.ui[0].length - 1) {
            state.ui[i][j] = "End";
            continue;
          }
          state.ui[i][j] = "None";
        }
      }
      state.isReset = true;
    },
    makeBlock(state, action) {
      const rowIdx = action.payload.row;
      const colIdx = action.payload.col;
      state.actualGrid[rowIdx][colIdx].isBlock = true;
      state.ui[rowIdx][colIdx] = "Block";
    },
    deleteBlock(state, action) {
      const rowIdx = action.payload.row;
      const colIdx = action.payload.col;
      state.actualGrid[rowIdx][colIdx].isBlock = false;
      state.ui[rowIdx][colIdx] = "None";
    },
    setIsVisualize(state, action) {
      state.isVisualizing = action.payload;
    },
    setIsReset(state, action) {
      state.isReset = action.payload;
    },
  },
});

const actions = gridSlice.actions;

export default gridSlice.reducer;
export { actions };
