import { UNVISITED, VISITED, PATH, START, END, WALL, WEIGHT } from '../constants';

async function bidirectional(grid, updateCell, start, end, stopRun) {
  const n = grid.length
  const m = grid[0].length
  let copy = JSON.parse(JSON.stringify(grid))
  // Initialize both visited
  let startVisited = Array(n).fill(0).map(() => new Array(m).fill(false))
  let endVisited = Array(n).fill(0).map(() => new Array(m).fill(false))
  startVisited[start[0]][start[1]] = true
  endVisited[end[0]][end[1]] = true
  // Initialize both queues
  let startQueue = [[start, []]]
  let endQueue = [[end, []]]

  let startPaths = Array(n).fill(0).map(() => new Array(m).fill([]))
  let endPaths = Array(n).fill(0).map(() => new Array(m).fill([]))

  const directions = [[-1, 0], [0, -1], [0, 1], [1, 0]]
  // While there are still nodes to explore
  while(startQueue.length > 0 && endQueue.length > 0) {
    // Pop 1 from each queue
    const [startCoord, startPath] = startQueue.shift()
    const [endCoord, endPath] = endQueue.shift()

    for(const d of directions) {
      const startRow = startCoord[0] + d[0]
      const startCol = startCoord[1] + d[1]
      const endRow = endCoord[0] + d[0]
      const endCol = endCoord[1] + d[1]
      // Check if start next coordinate is valid
      if(startRow > -1 && startRow  < n && startCol > -1 && startCol < m && !startVisited[startRow][startCol] && copy[startRow][startCol] !== WALL) {
        const newPath = startPath.concat([[startRow, startCol]])
        startQueue.push([[startRow, startCol], newPath])
        startPaths[startRow][startCol] = newPath
        startVisited[startRow][startCol] = true
        copy[startRow][startCol] = 1
        updateCell(startRow, startCol, 1)
      }
      // Check if end next coordinate is valid
      if(endRow > -1 && endRow  < n && endCol > -1 && endCol < m && !endVisited[endRow][endCol] && copy[endRow][endCol] !== WALL) {
        const newPath = endPath.concat([[endRow, endCol]])
        endQueue.push([[endRow, endCol], newPath])
        endPaths[endRow][endCol] = newPath
        endVisited[endRow][endCol] = true
        copy[endRow][endCol] = 1
        updateCell(endRow, endCol, 1)
      }
    }
    // Check if intersecting
    const intersecting = isIntersecting(startVisited, endVisited)
    if(intersecting) {
      const [row, col] = intersecting
      const newPath = startPaths[row][col].concat(endPaths[row][col])
      for(const [pathRow, pathCol] of newPath) {
        updateCell(pathRow, pathCol, 2)
        await new Promise(r => setTimeout(r, 10));
      }
      stopRun()
      return true
    }
    await new Promise(r => setTimeout(r, 10));
  }
  stopRun()
}

function isIntersecting(startVisited, endVisited) {
  const n = startVisited.length
  const m = startVisited[0].length
  for(let i = 0; i < n; i++) {
    for(let j = 0; j < m; j++) {
      if(startVisited[i][j] && endVisited[i][j]) {
        return [i, j]
      }
    }
  }
  return false
}

export default bidirectional;
