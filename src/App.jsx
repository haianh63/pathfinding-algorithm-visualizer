import { useDispatch, useSelector } from "react-redux";
import { actions } from "./store/grid-slice";
import { aStar, bfs, dfs, dijkstra } from "./utils/grid";
import { PlayIcon, PauseIcon, ArrowPathIcon } from "@heroicons/react/24/solid";
import Grid from "./graph/Grid";
import { useState } from "react";
function App() {
  const dispatch = useDispatch();
  const grid = useSelector((state) => state.grid.actualGrid);
  const algorithms = {
    "A*": aStar,
    "Breadth First Search": bfs,
    "Depth First Search": dfs,
    "Dijkstra's": dijkstra,
  };

  const [currentAlgorithm, setCurrentAlgorithm] = useState("A*");

  const visualize = () => {
    dispatch(actions.setIsVisualize(true));
    dispatch(actions.setIsReset(false));
    const path = algorithms[currentAlgorithm](grid, 0, 299, dispatch, actions);
    if (path.length === 0) {
      setTimeout(() => {
        dispatch(actions.setIsVisualize(false));
      }, 500);
    }

    const n = grid[0].length;
    for (let i = 0; i < path.length; ++i) {
      const rowIdx = Math.floor(path[i] / n);
      const colIdx = path[i] % n;
      setTimeout(() => {
        dispatch(
          actions.changeStatus({
            row: rowIdx,
            col: colIdx,
            status: "Correct-Path",
          })
        );

        if (i === path.length - 1) {
          dispatch(actions.setIsVisualize(false));
        }
      }, 500);
    }
  };

  const isVisualizing = useSelector((state) => state.grid.isVisualizing);
  const isReset = useSelector((state) => state.grid.isReset);

  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-gray-50">
      <h1 className="font-bold text-xl my-5">
        Pathfinding Algorithm Visualizer
      </h1>
      <div className="w-full max-w-6xl">
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <select
            disabled={isVisualizing}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none"
            onChange={(e) => {
              if (!isReset) {
                dispatch(actions.reset());
              }
              setCurrentAlgorithm(e.target.value);
            }}
          >
            {Object.keys(algorithms).map((algorithm) => {
              return (
                <option key={algorithm} value={algorithm}>
                  {algorithm}
                </option>
              );
            })}
          </select>

          <div className="flex items-center gap-2">
            <button
              onClick={visualize}
              disabled={isVisualizing || !isReset}
              className={`flex items-center px-4 py-2 font-medium rounded-lg transition-colors cursor-pointer
                ${
                  isVisualizing
                    ? "bg-gray-100 text-gray-600"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isVisualizing || !isReset ? (
                <>
                  <PauseIcon className="w-4 h-4 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <PlayIcon className="w-4 h-4 mr-2" />
                  Visualize
                </>
              )}
            </button>
            <button
              disabled={isVisualizing}
              className="flex items-center px-4 py-2 font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => {
                dispatch(actions.reset());
              }}
            >
              <ArrowPathIcon className="w-4 h-4 mr-2" /> Reset
            </button>
          </div>
        </div>

        <Grid />

        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 border border-gray-200 rounded-sm" />
            <span className="text-sm text-gray-600">Start Node</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 border border-gray-200 rounded-sm" />
            <span className="text-sm text-gray-600">End Node</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-700 border border-gray-200 rounded-sm" />
            <span className="text-sm text-gray-600">Wall Node</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-300 border border-gray-200 rounded-sm" />
            <span className="text-sm text-gray-600">Visited Node</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-400 border border-gray-200 rounded-sm" />
            <span className="text-sm text-gray-600">Path Node</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
