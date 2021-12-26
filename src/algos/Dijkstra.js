import { n, m, START, END, WALL } from '../constants';
import {init, add, pop} from './pq'

async function dijkstra(grid, weight, updateCell, i, j, stopRun) {
  // deep copy of our state grid
  let gridCopy = JSON.parse(JSON.stringify(grid))
  // visited to keep track
  let visited = Array(n).fill(0).map(() => new Array(m).fill(false))
  // dist[i][j] is the min dist to node i, j
  let dist = []
  for(let i = 0; i < n; i ++) {
    dist.push(new Array(m))
    for(let j = 0; j < m; j ++) {
      dist[i][j] = {
        cost: Number.MAX_VALUE,
        coord: [i,j]
      }
    }
  }
  // set start to 0
  dist[i][j].cost = 0
  // parent[i][j] gives the previous node that connected to i, j (to form our shortest path)
  let parent = Array(n).fill(0).map(() => new Array(m).fill(undefined))
  // initalize our priority queue with source [cost, [i, j]]
  let pq = [ dist[i][j] ]
  init(pq)

  while(pq.length > 0) {
    const {cost, coord} = pop(pq)
    const [row, col] = coord
    // Check if this is the destination node
    if(gridCopy[row][col] === END) {
      let path = []
      let [r, c] = parent[row][col]
      while(parent[r][c] !== undefined) {
        path.push([r, c])
        const next = parent[r][c]
        r = next[0]
        c = next[1]
      }
      for(const coord of path.reverse()) {
        updateCell(coord[0], coord[1], 2)
        await new Promise(r => setTimeout(r, 10));
      }
      stopRun()
      return
    }

    // Check if node has been visited already
    if(visited[row][col])
      continue

    // Update cell state to VISITED
    if(gridCopy[row][col] !== START)
      updateCell(row, col, 1)
    await new Promise(r => setTimeout(r, 10));
    visited[row][col] = true

    const directions = [[row-1, col], [row, col-1], [row, col+1], [row+1, col]]
    for(const d of directions) {
      const [r, c] = d
      if(r > -1 && r < n && c > -1 && c < m && !visited[r][c] && gridCopy[r][c] !== WALL) {
        const newCost = dist[row][col].cost + weight[r][c]
        if(newCost < dist[r][c].cost) {
          // Found new short path, set the parent of the neighbor node to this one
          parent[r][c] = [row, col]
          dist[r][c].cost = newCost
          add(pq, dist[r][c])
        }
      }
    }
  }

  stopRun()
}

export default dijkstra;
