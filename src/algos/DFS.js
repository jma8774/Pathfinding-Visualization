import { n, m, END, WALL } from '../constants';

let found = false

async function dfs(grid, updateCell, i, j, stopRun) {
  found = false
  let copy = JSON.parse(JSON.stringify(grid))
  let visited = Array(n).fill(0).map(() => new Array(m).fill(false))
  visited[i][j] = true
  let path = []

  // Perform DFS
  await dfsHelper(copy, updateCell, visited, path, i, j)

  for(const [pathRow, pathCol] of path) {
    updateCell(pathRow, pathCol, 2)
    await new Promise(r => setTimeout(r, 10));
  }
  stopRun()
}

async function dfsHelper(grid, updateCell, visited, path, row, col) {
  await new Promise(r => setTimeout(r, 10));

  // Found end cell
  if(grid[row][col] === END) {
    path.pop()
    found = true
    return
  }
  // Diagonals [row-1, col-1], [row-1, col+1], [row+1, col-1], [row+1, col+1]
  const directions = [[row-1, col], [row, col-1], [row, col+1], [row+1, col]]

  for(const [i, j] of directions) {
    if(i > -1 && i < grid.length && j > -1 && j < grid[0].length && visited[i][j] === false && grid[i][j] !== WALL) {
      visited[i][j] = true
      path.push([i, j])
      if(grid[i][j] !== END)
        updateCell(i, j, 1)
      await dfsHelper(grid, updateCell, visited, path, i, j)
      // If path has been found, stop all operations
      if(found) 
        return 
      path.pop()
    }
  }
}

export default dfs;
