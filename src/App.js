import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import HelpIcon from '@mui/icons-material/Help';
import { UNVISITED, VISITED, PATH, START, END, WALL, WEIGHT } from './constants';
import Node from './Node'
import HelpBox from './components/HelpBox'
import bfs from './algos/BFS'
import dfs from './algos/DFS'
import bidirectional from './algos/Bidirectional'

const n = 20
const m = 45

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function App() {
  const [grid, setGrid] = useState(Array(n).fill(UNVISITED).map(() => new Array(m).fill(UNVISITED)))
  const [weight, setWeight] = useState(Array(n).fill(1).map(() => new Array(m).fill(1)))
  const [start, setStart] = useState([getRandomInt(n), getRandomInt(m)])
  const [end, setEnd] = useState([getRandomInt(n), getRandomInt(m)])
  const [running, setRunning] = useState(false)
  const [message, setMessage] = useState('Hi there, welcome to the pathfinding visualizer! If you need help, click on the question mark icon. ')

  const updateCell = (i, j, val) => {
    setGrid(prevState => {
      const copy = [...prevState]
      copy[i][j] = val
      return copy
    })
  }
  
  const randomStartEnd = () => {
    clearPaths()
    updateCell(start[0], start[1], 0)
    updateCell(end[0], end[1], 0)
    const newStart = [getRandomInt(n), getRandomInt(m)]
    const newEnd = [getRandomInt(n), getRandomInt(m)]
    setStart(newStart)
    setEnd(newEnd)
    updateCell(newStart[0], newStart[1], START)
    updateCell(newEnd[0], newEnd[1], END)
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
    randomStartEnd()
  }, [])
  
  return (
    <Box>
      <Typography variant="h4" sx={{textAlign: "center", mt: 6}}> Pathfinding Algorithm Visualization </Typography>
      <Stack direction="row" spacing={1} justifyContent="center" mt={3}>
        <Button variant="contained" disabled={running} onClick={() => {
          setRunning(true)
          clearPaths()
          bfs(grid, updateCell, start[0], start[1], () => setRunning(false))
          setMessage("BFS guarantee that we will travel the shortest path in an unweighted graph")
        }}> BFS </Button>
        <Button variant="contained" disabled={running} onClick={() => {
          setRunning(true)
          clearPaths()
          dfs(grid, updateCell, start[0], start[1], () => setRunning(false))
          setMessage("DFS does not guarantee that we will travel the shortest path")
        }}> DFS </Button>
                <Button variant="contained" disabled={running} onClick={() => {
          setRunning(true)
          clearPaths()
          bidirectional(grid, updateCell, start, end, () => setRunning(false))
          setMessage("Bidirectional search will find the shortest path between 2 nodes in an unweighted graph")
        }}> Bidirectional Search </Button>
        <Button variant="contained" color="secondary" disabled={running} onClick={() => console.log("Create Weighted Cell")}> Create Weight (WIP) </Button>
        <Button variant="outlined" disabled={running} onClick={resetGrid}> Reset </Button>
        <Button variant="outlined" disabled={running} onClick={randomStartEnd}> Random Start/End </Button>
        <Button variant="outlined" disabled={running} onClick={generateWalls}> Generate Walls </Button>
        <Tooltip title={<HelpBox/>}>
          <IconButton>
            <HelpIcon />
          </IconButton>
        </Tooltip>
      </Stack>
      <Typography variant="body1" textAlign="center" mt={2}> {message} </Typography>
      {/* Grid cells */}
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
      {/* Legend */}
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
          <Node val={WEIGHT} />
          <Typography ml={1}> 
            Weighted Cell
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
