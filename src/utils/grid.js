import {
  MinPriorityQueue,
  PriorityQueue,
} from "@datastructures-js/priority-queue";
import { Queue } from "@datastructures-js/queue";
import { Stack } from "@datastructures-js/stack";

class Node {
  constructor(row, col, distance, isBlock, status) {
    this.row = row;
    this.col = col;
    this.status = status;
    this.isBlock = isBlock;
  }
}
const generateGrid = (m, n) => {
  const grid = [];
  for (let i = 0; i < m; ++i) {
    const ins = [];
    for (let j = 0; j < n; ++j) {
      ins.push(new Node(i, j, 0, false, "None"));
    }
    grid.push(ins);
  }

  return grid;
};

const generateUIGrid = (m, n) => {
  const grid = [];
  for (let i = 0; i < m; ++i) {
    const ins = [];
    for (let j = 0; j < n; ++j) {
      if (i == 0 && j == 0) {
        ins.push("Start");
        continue;
      }
      if (i == m - 1 && j == n - 1) {
        ins.push("End");
        continue;
      }
      ins.push("None");
    }
    grid.push(ins);
  }

  return grid;
};

const bfs = (grid, a, b, dispatch, actions) => {
  const n = grid[0].length;
  const m = grid.length;
  const checkCoordinates = (i, j) => {
    return 0 <= i && i < m && 0 <= j && j < n;
  };

  const Q = new Queue();
  const S = new Set();
  const previous = new Map();
  Q.enqueue(a);
  S.add(a);
  for (let i = 0; i < m * n; ++i) {
    previous.set(i, null);
  }

  setTimeout(() => {
    dispatch(
      actions.changeStatus({
        row: Math.floor(a / n),
        col: a % n,
        status: "Visited",
      })
    );
  }, 500);

  while (!Q.isEmpty()) {
    const u = Q.dequeue();
    const rowIdx = Math.floor(u / n);
    const colIdx = u % n;

    const neighbors = [
      [rowIdx, colIdx + 1], // Right
      [rowIdx + 1, colIdx], // Down
      [rowIdx, colIdx - 1], // Left
      [rowIdx - 1, colIdx], // Up
      [rowIdx - 1, colIdx - 1], // Top Left
      [rowIdx - 1, colIdx + 1], // Top Right
      [rowIdx + 1, colIdx - 1], // Down Left
      [rowIdx + 1, colIdx + 1], // Down Right
    ];

    for (const [i, j] of neighbors) {
      if (checkCoordinates(i, j) && !S.has(i * n + j) && !grid[i][j].isBlock) {
        const v = i * n + j;
        Q.enqueue(v);
        S.add(v);

        setTimeout(() => {
          dispatch(
            actions.changeStatus({
              row: i,
              col: j,
              status: "Visited",
            })
          );
        }, 500);

        previous.set(v, u);
        if (v === b) {
          return reconstructedPath(previous, a, b);
        }
      }
    }
  }

  return [];
};

const dfs = (grid, a, b, dispatch, actions) => {
  const n = grid[0].length;
  const m = grid.length;
  const checkCoordinates = (i, j) => {
    return 0 <= i && i < m && 0 <= j && j < n;
  };

  const St = new Stack();
  const S = new Set();
  const previous = new Map();
  St.push(a);
  S.add(a);
  for (let i = 0; i < m * n; ++i) {
    previous.set(i, null);
  }

  setTimeout(() => {
    dispatch(
      actions.changeStatus({
        row: Math.floor(a / n),
        col: a % n,
        status: "Visited",
      })
    );
  }, 500);

  while (!St.isEmpty()) {
    const u = St.pop();
    const rowIdx = Math.floor(u / n);
    const colIdx = u % n;

    const neighbors = [
      [rowIdx, colIdx + 1], // Right
      [rowIdx + 1, colIdx], // Down
      [rowIdx, colIdx - 1], // Left
      [rowIdx - 1, colIdx], // Up
      [rowIdx - 1, colIdx - 1], // Top Left
      [rowIdx - 1, colIdx + 1], // Top Right
      [rowIdx + 1, colIdx - 1], // Down Left
      [rowIdx + 1, colIdx + 1], // Down Right
    ];

    for (const [i, j] of neighbors) {
      if (checkCoordinates(i, j) && !S.has(i * n + j) && !grid[i][j].isBlock) {
        const v = i * n + j;
        St.push(v);
        S.add(v);

        setTimeout(() => {
          dispatch(
            actions.changeStatus({
              row: i,
              col: j,
              status: "Visited",
            })
          );
        }, 500);

        previous.set(v, u);
        if (v === b) {
          return reconstructedPath(previous, a, b);
        }
      }
    }
  }
  return [];
};

const dijkstra = (grid, a, b, dispatch, actions) => {
  const n = grid[0].length;
  const m = grid.length;
  const checkCoordinates = (i, j) => {
    return 0 <= i && i < m && 0 <= j && j < n;
  };
  const Q = new MinPriorityQueue((data) => data[1]);
  const S = new Set();
  const d = new Map();
  const previous = new Map();

  for (let i = 0; i < m * n; ++i) {
    d.set(i, Number.POSITIVE_INFINITY);
    previous.set(i, null);
  }

  Q.enqueue([a, 0]);
  d.set(a, 0);
  while (!Q.isEmpty()) {
    const u = Q.dequeue()[0];
    S.add(u);
    const rowIdx = Math.floor(u / n);
    const colIdx = u % n;

    setTimeout(() => {
      dispatch(
        actions.changeStatus({
          row: rowIdx,
          col: colIdx,
          status: "Visited",
        })
      );
    }, 500);

    if (u === b) {
      return reconstructedPath(previous, a, b);
    }

    const neighbors = [
      [rowIdx, colIdx + 1, 10], // Right
      [rowIdx + 1, colIdx, 10], // Down
      [rowIdx, colIdx - 1, 10], // Left
      [rowIdx - 1, colIdx, 10], // Up
      [rowIdx - 1, colIdx - 1, 14], // Top Left
      [rowIdx - 1, colIdx + 1, 14], // Top Right
      [rowIdx + 1, colIdx - 1, 14], // Down Left
      [rowIdx + 1, colIdx + 1, 14], // Down Right
    ];

    for (const [i, j, distance] of neighbors) {
      if (checkCoordinates(i, j) && !S.has(i * n + j) && !grid[i][j].isBlock) {
        const v = i * n + j;
        const alt = d.get(u) + distance;
        if (alt < d.get(v)) {
          d.set(v, alt);
          Q.enqueue([v, alt], alt);
          previous.set(v, u);
        }
      }
    }
  }
  return [];
};

const aStar = (grid, a, b, dispatch, actions) => {
  const n = grid[0].length;
  const m = grid.length;
  const checkCoordinates = (i, j) => {
    return 0 <= i && i < m && 0 <= j && j < n;
  };

  const heuristicFunction = (a, b) => {
    const i1 = Math.floor(a / n),
      j1 = a % n;
    const i2 = Math.floor(b / n),
      j2 = b % n;
    const dx = Math.abs(i1 - i2);
    const dy = Math.abs(j1 - j2);
    return 10 * (dx + dy) + 4 * Math.min(dx, dy);
  };

  const Q = new PriorityQueue((a, b) => {
    if (a[1] + a[2] < b[1] + b[2]) {
      return -1;
    }

    if (a[1] + a[2] > b[1] + b[2]) {
      return 1;
    }

    return a[2] < b[2] ? -1 : 1;
  });
  const S = new Set();
  const previous = new Map();
  const cost = new Map();
  for (let i = 0; i < m * n; ++i) {
    previous.set(i, null);
  }

  Q.enqueue([a, 0, heuristicFunction(a, b)]);
  cost.set(a, heuristicFunction(a, b));
  while (!Q.isEmpty()) {
    const current = Q.dequeue();
    S.add(current[0]);

    const rowIdx = Math.floor(current[0] / n);
    const colIdx = current[0] % n;
    setTimeout(() => {
      dispatch(
        actions.changeStatus({
          row: rowIdx,
          col: colIdx,
          status: "Visited",
        })
      );
    }, 300);

    if (current[0] === b) {
      return reconstructedPath(previous, a, b);
    }

    const neighbors = [
      [rowIdx, colIdx + 1, 10], // Right
      [rowIdx + 1, colIdx, 10], // Down
      [rowIdx, colIdx - 1, 10], // Left
      [rowIdx - 1, colIdx, 10], // Up
      [rowIdx - 1, colIdx - 1, 14], // Top Left
      [rowIdx - 1, colIdx + 1, 14], // Top Right
      [rowIdx + 1, colIdx - 1, 14], // Down Left
      [rowIdx + 1, colIdx + 1, 14], // Down Right
    ];

    for (const [i, j, distance] of neighbors) {
      if (!checkCoordinates(i, j) || S.has(i * n + j) || grid[i][j].isBlock) {
        continue;
      }
      const v = i * n + j;
      const G = current[1] + distance;
      const H = heuristicFunction(v, b);
      if (!cost.has(v) || G + H < cost.get(v)) {
        Q.enqueue([v, G, H]);
        cost.set(v, G + H);
        previous.set(v, current[0]);
      }
    }
  }
  return [];
};

const reconstructedPath = (previous, a, b) => {
  const Path = [];
  let u = b;
  while (u !== a) {
    Path.push(u);
    u = previous.get(u);
  }
  Path.push(a);
  return Path.reverse();
};

export { generateGrid, generateUIGrid, dijkstra, bfs, dfs, aStar };
