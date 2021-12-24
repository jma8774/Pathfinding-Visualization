import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Node from './Node'
import bfs from './algos/BFS'
import dfs from './algos/DFS'

const UNVISITED = 0
const VISITED = 1
const PATH = 2
const START = 3
const END = 4
const WALL = 5

const n = 20
const m = 45

function App() {
  const [grid, setGrid] = useState(Array(n).fill(UNVISITED).map(() => new Array(m).fill(UNVISITED)))
  const [start, setStart] = useState([3, 3])
  const [end, setEnd] = useState([6, 6])
  const [running, setRunning] = useState(false)

  const updateCell = (i, j, val) => {
    setGrid(prevState => {
      const copy = [...prevState]
      copy[i][j] = val
      return copy
    })
  }
  
  const clearPaths = () => {
    setGrid(prevState => {
      const copy = [...prevState]
      for(let i = 0; i < n; i++) {
        for(let j = 0; j < m; j++) {
          if(copy[i][j] === VISITED || copy[i][j] === PATH) {
            copy[i][j] = 0
          }
        }
      }
      return copy
    })
  }

  const resetGrid = () => {
    setGrid(prevState => {
      const copy = [...prevState]
      for(let i = 0; i < n; i++) {
        for(let j = 0; j < m; j++) {
          if(copy[i][j] !== START && copy[i][j] !== END) {
            copy[i][j] = 0
          }
        }
      }
      return copy
    })
  }

  const generateWalls = async () => {
    resetGrid()
    await new Promise(r => setTimeout(r, 100));
    setGrid(prevState => {
      const copy = [...prevState]
      for(let i = 0; i < n; i++) {
        for(let j = 0; j < m; j++) {
          if(copy[i][j] !== START && copy[i][j] !== END && Math.random() < 0.2) {
            copy[i][j] = WALL
          }
        }
      }
      return copy
    })
  }

  useEffect(() => {
    // Starting Point
    updateCell(start[0], start[1], 3) 
    // End Point
    updateCell(end[0], end[1], 4)
  }, [])
  
  useEffect(() => {
    // console.log("Grid Changed", grid)
  }, [grid])

  return (
    <Box>
      <Typography variant="h4" sx={{textAlign: "center", mt: 6}}> Pathfinding Algorithm Visualization </Typography>
      <Stack direction="row" spacing={1} justifyContent="center" mt={3}>
        <Button variant="contained" disabled={running} onClick={() => {
          setRunning(true)
          clearPaths()
          bfs(grid, updateCell, start[0], start[1], () => setRunning(false))
        }}> BFS </Button>
        <Button variant="contained" disabled={running} onClick={() => {
          setRunning(true)
          clearPaths()
          dfs(grid, updateCell, start[0], start[1], () => setRunning(false))
        }}> DFS </Button>
        <Button variant="outlined" disabled={running} onClick={resetGrid}> Reset </Button>
        <Button variant="outlined" disabled={running} onClick={generateWalls}> Generate Walls </Button>
      </Stack>
      <Typography variant="body1" textAlign="center" mt={2}> You can create walls by holding left click and move the start and end points by dragging them </Typography>
      <Box sx={{display: "flex", flexDirection: "column", alignContents: "center", justifyContent: "center", mt: 8}}>
        { grid.map((row, i) => {
              return (
              <Box key={`row${i}`} sx={{display: "flex", justifyContent: "center"}}>
                { row.map((val, j) =>
                    <Node key={`col${j}`} val={val}></Node>
                  )
                }
              </Box>
            )})
        }
      </Box>
      <Stack direction="row" spacing={1} justifyContent="center" mt={4}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Node val={START} />
          <Typography ml={1}> 
            Start Point
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Node val={END} />
          <Typography ml={1}> 
            End Point
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Node val={VISITED} />
          <Typography ml={1}> 
            Visited
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Node val={PATH} />
          <Typography ml={1}> 
            Path Taken
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Node val={WALL} />
          <Typography ml={1}> 
            Walls
          </Typography>
        </Box>
      </Stack>
    </Box>
  )
}

export default App;
