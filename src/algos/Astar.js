import { n, m, START, END, WALL } from '../constants';
import {init, add, pop} from './pq'

/*
ASTAR ALGORTHM EXPLAINED WHAT I KNOW:

It is a variation of Dijkstra's Algorithm.
In dijkstra's algorithm, we visit the node with the least cost, let's call that the g-score
In astar, we also look at the g-score when determining what to visit, but we also look at the h-score
The h-score is the heuristic calculation for how close we are to the end point (manhattan distance)
When deciding which cell to visit, we take the minimum of f(n) = g(n) + h(n)
Thus, we are making an educated guess on which node which has the lowest cost + lowest distance from the end point
*/

// Calcuate the heuristic from end (estimated distance)
function predict(current, end) {
  const y = Math.abs(end[0]-current[0])
  const x = Math.abs(end[1]-current[1])
  return Math.pow(x, 2) + Math.pow(y, 2)
}

async function astar(grid, weight, updateCell, start, end, stopRun) {
  const [startRow, startCol] = start
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
        cost: Number.MAX_VALUE, // fScore
        gScore: Number.MAX_VALUE,
        coord: [i,j]
      }
    }
  }
  // set start to 0
  dist[startRow][startCol].cost = 0
  dist[startRow][startCol].gScore = 0
  // parent[i][j] gives the previous node that connected to i, j (to form our shortest path)
  let parent = Array(n).fill(0).map(() => new Array(m).fill(undefined))
  // initalize our priority queue with source [cost, [i, j]]
  let pq = [ dist[startRow][startCol] ]
  init(pq)

  while(pq.length > 0) {
    const {cost, gScore, coord} = pop(pq)
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
        const newGScore = gScore + weight[r][c]
        if(newGScore < dist[r][c].gScore) {
          // Found new short path, set the parent of the neighbor node to this one
          parent[r][c] = [row, col]
          dist[r][c].cost = newGScore + predict([r, c], end) 
          dist[r][c].gScore = newGScore 
          add(pq, dist[r][c])
        }
      }
    }
  }

  stopRun()
}

export default astar;
