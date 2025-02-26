import { Queue } from "@datastructures-js/queue";
import { MinPriorityQueue } from "@datastructures-js/priority-queue";

class Graph {
  constructor(size) {
    this.adjMatrix = [];
    for (let i = 0; i < size; ++i) {
      const ins = [];
      for (let j = 0; j < size; ++j) {
        ins.push(undefined);
      }
      this.adjMatrix.push(ins);
    }
    this.size = size;
  }

  addEdge(u, v, weight) {
    if (0 <= u && u < this.size && 0 <= v && v < this.size) {
      this.adjMatrix[u][v] = weight;
    }
  }
}

const bfs = async (graph, a, b, dispatch, actions) => {
  const Q = new Queue();
  const S = new Set();
  const previous = new Map();
  Q.enqueue(a);
  S.add(a);
  for (let i = 0; i < graph.size; ++i) {
    previous.set(i, null);
  }

  dispatch(
    actions.changeStatus({
      node: a,
      status: "Visited",
    })
  );
  await new Promise((resolve) => setTimeout(resolve, 50));

  while (!Q.isEmpty()) {
    const u = Q.dequeue();
    for (let v = 0; v < graph.size; ++v) {
      if (graph.adjMatrix[u][v] !== undefined && !S.has(v)) {
        Q.enqueue(v);
        S.add(v);

        setTimeout(() => {
          dispatch(actions.changeStatus({ node: v, status: "Visited" }));
        }, 500);

        previous.set(v, u);
        if (v === b) {
          return reconstructedPath(previous, a, b);
        }
      }
    }
  }
};

const dijkstra = async (graph, a, b, dispatch, actions) => {
  const Q = new MinPriorityQueue((data) => data[1]);
  const S = new Set();
  const d = new Map();
  const previous = new Map();

  for (let i = 0; i < graph.size; ++i) {
    d.set(i, Number.POSITIVE_INFINITY);
    previous.set(i, null);
  }

  Q.enqueue([a, 0]);
  d.set(a, 0);
  while (!Q.isEmpty()) {
    const u = Q.dequeue()[0];
    S.add(u);

    setTimeout(() => {
      dispatch(actions.changeStatus({ node: u, status: "Visited" }));
    }, 500);

    if (u === b) {
      return reconstructedPath(previous, a, b);
    }
    for (let v = 0; v < graph.size; ++v) {
      if (graph.adjMatrix[u][v] !== undefined && !S.has(v)) {
        const alt = d.get(u) + graph.adjMatrix[u][v];
        if (alt < d.get(v)) {
          d.set(v, alt);
          Q.enqueue([v, alt]);
          previous.set(v, u);
        }
      }
    }
  }
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

const createGridGraph = (size) => {
  const checkCoordinates = (i, j) => {
    return 0 <= i && i < size && 0 <= j && j < size;
  };
  const coordinatesToNode = (i, j) => {
    return i * size + j;
  };
  const g = new Graph(size * size);
  for (let i = 0; i < size; ++i) {
    for (let j = 0; j < size; ++j) {
      g.addEdge(coordinatesToNode(i, j), coordinatesToNode(i, j), 0);

      if (checkCoordinates(i, j + 1)) {
        g.addEdge(coordinatesToNode(i, j), coordinatesToNode(i, j + 1), 10);
      }

      if (checkCoordinates(i, j - 1)) {
        g.addEdge(coordinatesToNode(i, j), coordinatesToNode(i, j - 1), 10);
      }

      if (checkCoordinates(i + 1, j)) {
        g.addEdge(coordinatesToNode(i, j), coordinatesToNode(i + 1, j), 10);
      }

      if (checkCoordinates(i - 1, j)) {
        g.addEdge(coordinatesToNode(i, j), coordinatesToNode(i - 1, j), 10);
      }

      if (checkCoordinates(i - 1, j - 1)) {
        g.addEdge(coordinatesToNode(i, j), coordinatesToNode(i - 1, j - 1), 14);
      }

      if (checkCoordinates(i - 1, j + 1)) {
        g.addEdge(coordinatesToNode(i, j), coordinatesToNode(i - 1, j + 1), 14);
      }
      if (checkCoordinates(i + 1, j - 1)) {
        g.addEdge(coordinatesToNode(i, j), coordinatesToNode(i + 1, j - 1), 14);
      }
      if (checkCoordinates(i + 1, j + 1)) {
        g.addEdge(coordinatesToNode(i, j), coordinatesToNode(i + 1, j + 1), 14);
      }
    }
  }

  return g;
};

//const g = new Graph(4);
// g.addEdge(0, 1, 3);
// g.addEdge(0, 2, 2);
// g.addEdge(3, 0, 4);
// g.addEdge(2, 1, 1);

// const path = bfs(g, 3, 1);
// console.log(path);

// const g = new Graph(6); // 6 nodes (A, B, C, D, E, F)
// // Adding edges with weights
// g.addEdge(0, 1, 5); // A -> B (5)
// g.addEdge(0, 2, 2); // A -> C (2)
// g.addEdge(1, 2, 1); // B -> C (1)
// g.addEdge(1, 3, 4); // B -> D (4)
// g.addEdge(1, 4, 2); // B -> E (2)
// g.addEdge(2, 4, 7); // C -> E (7)
// g.addEdge(3, 4, 2); // D -> E (2)
// g.addEdge(3, 5, 3); // D -> F (3)
// g.addEdge(4, 5, 1); // E -> F (1)
// console.log(dijkstra(g, 0, 5));

export { createGridGraph, bfs, dijkstra };
// const g = createGridGraph(3);
// console.log(dijkstra(g, 0, 8));
