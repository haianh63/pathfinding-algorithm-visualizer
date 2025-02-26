const UIStatus = {
  NONE: "None",
  VISITED: "Visited",
  CORRECT_PATH: "Correct-Path",
};

const GRID_SIZE = 30;

const generateUIGraph = (size) => {
  const UIGraph = [];
  for (let i = 0; i < size; ++i) {
    const ins = [];
    for (let j = 0; j < size; ++j) {
      ins.push(UIStatus.NONE);
    }
    UIGraph.push(ins);
  }

  return UIGraph;
};

export { UIStatus, generateUIGraph, GRID_SIZE };
