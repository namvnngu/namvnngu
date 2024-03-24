/**
 * Description: Mark highlight area in the 2D grid layout
 * Source: Nam (nnfunny)
 * Date: 17/06/2022
 */
type Highlight = {
  position: number;
  dimension: [number, number];
};

const printLayout = (layout: number[][]) => {
  for (let row = 0; row < layout.length; row++) {
    console.log(layout[row].join(", "));
  }
};

const generateGrid = (numOfRow: number, numOfCol: number) => {
  const grid: number[][] = [];
  for (let row = 0; row < numOfRow; row++) {
    grid.push([]);
    for (let col = 0; col < numOfCol; col++) {
      grid[row].push(numOfCol * row + col);
    }
  }
  return grid;
};

const DFS = (
  grid: number[][],
  row: number,
  col: number,
  position: [number, number],
  highlight: Highlight,
) => {
  const numOfCol = grid[0].length;
  const numOfRow = grid.length;

  if (
    row < 0 ||
    col < 0 ||
    row >= numOfRow ||
    col >= numOfCol ||
    row < position[1] ||
    col < position[0] ||
    row >= position[1] + highlight.dimension[1] ||
    col >= position[0] + highlight.dimension[0]
  ) {
    return;
  }

  grid[row][col] = highlight.position;
  DFS(grid, row + 1, col, position, highlight);
  DFS(grid, row, col + 1, position, highlight);
};

const markHighLight = (grid: number[][], highlight: Highlight) => {
  let stop = false;
  let lastPosition = highlight.position;
  const numOfCol = grid[0].length;
  const numOfRow = grid.length;
  const position2D: [number, number] = [
    highlight.position - numOfCol * Math.floor(highlight.position / numOfCol),
    Math.floor(highlight.position / numOfCol),
  ];

  for (let row = 0; row < numOfRow; row++) {
    for (let col = 0; col < numOfCol; col++) {
      if (grid[row][col] === highlight.position && !stop) {
        DFS(grid, row, col, position2D, highlight);
        stop = true;
      } else if (grid[row][col] !== highlight.position && stop) {
        grid[row][col] = ++lastPosition;
      }
    }
  }
  return grid;
};

const grid = generateGrid(3, 6);

printLayout(
  markHighLight(grid, {
    dimension: [4, 3],
    position: 2,
  }),
);
