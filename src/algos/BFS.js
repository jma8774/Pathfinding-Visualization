import { n, m, END, WALL } from '../constants';

async function bfs(grid, updateCell, i, j, stopRun, fast) {
  let copy = JSON.parse(JSON.stringify(grid))
  let visited = Array(n).fill(0).map(() => new Array(m).fill(false))
  visited[i][j] = true
  const start = [i, j]
  const path = []
  let queue = [[start, path]]
  
  while(queue.length > 0) {
    // Pop item from queue
    const [coord, path] = queue.shift()
    const [row, col] = coord
    
    // Travel in all directions
    const directions = [[row-1, col], [row, col-1], [row, col+1], [row+1, col]]
    for(const d of directions) {
      const [r, c] = d
      if(r > -1 && r < n && c > -1 && c < m && !visited[r][c] && copy[r][c] !== WALL) {
        // Found destination
        if(copy[r][c] === END) {
          for(const [pathRow, pathCol] of path) {
            updateCell(pathRow, pathCol, 2)
            await new Promise(r => setTimeout(r, 10));
          }
          stopRun()
          return true
        }
        queue.push([d, path.concat([d])])
        visited[r][c] = true
        copy[r][c] = 1
        updateCell(r, c, 1)
        if(!fast) await new Promise(r => setTimeout(r, 10))
      }
    }
  }
  stopRun()
}

export default bfs;
