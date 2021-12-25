import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import ButtonGroup from '@mui/material/ButtonGroup';
import HelpIcon from '@mui/icons-material/Help';
import { n, m, UNVISITED, VISITED, PATH, START, END, WALL, WEIGHT } from './constants';
import Node from './components/Node'
import HelpBox from './components/HelpBox'
import SelectAlgo from './components/SelectAlgo'
import Legend from './components/Legend'
import bfs from './algos/BFS'
import dfs from './algos/DFS'
import bidirectional from './algos/Bidirectional'

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function App() {
  const [grid, setGrid] = useState(Array(n).fill(UNVISITED).map(() => new Array(m).fill(UNVISITED)))
  const [weight, setWeight] = useState(Array(n).fill(1).map(() => new Array(m).fill(1)))
  const [start, setStart] = useState([getRandomInt(n), getRandomInt(m)])
  const [end, setEnd] = useState([getRandomInt(n), getRandomInt(m)])
  const [running, setRunning] = useState(false)
  const [message, setMessage] = useState('Hi there, welcome to the pathfinding visualizer! Press the question mark for instructions on how to add/delete grids.')
  const [keyPressed, setKeyPressed] = useState('')

  const updateWeight = (i, j, val) => {
    setWeight(prevState => {
      const newWeight = [...prevState]
      newWeight[i][j] = val
      return newWeight
    })
  }

  const updateCell = (i, j, val) => {
    setGrid(prevState => {
      const newGrid = [...prevState]
      newGrid[i][j] = val
      return newGrid
    })
  }
  
  const randomStartEnd = () => {
    clearPaths()
    updateCell(start[0], start[1], UNVISITED)
    updateCell(end[0], end[1], UNVISITED)
    const newStart = [getRandomInt(n), getRandomInt(m)]
    const newEnd = [getRandomInt(n), getRandomInt(m)]
    setStart(newStart)
    setEnd(newEnd)
    updateCell(newStart[0], newStart[1], START)
    updateCell(newEnd[0], newEnd[1], END)
    updateWeight(newStart[0], newStart[1], 1)
    updateWeight(newEnd[0], newEnd[1], 1)
  }

  // Clear visited and path nodes
  const clearPaths = () => {
    setGrid(prevState => {
      const copy = [...prevState]
      for(let i = 0; i < n; i++) {
        for(let j = 0; j < m; j++) {
          if(weight[i][j] > 1) {
            copy[i][j] = WEIGHT
          }
          else if(copy[i][j] === VISITED || copy[i][j] === PATH) {
            copy[i][j] = UNVISITED
          }
        }
      }
      return copy
    })
  }

  // Reset everything to default
  const resetGrid = () => {
    setGrid(prevState => {
      const copy = [...prevState]
      for(let i = 0; i < n; i++) {
        for(let j = 0; j < m; j++) {
          if(copy[i][j] !== START && copy[i][j] !== END) {
            copy[i][j] = UNVISITED
          }
        }
      }
      return copy
    })
    setWeight(prevState => {
      const copy = [...prevState]
      for(let i = 0; i < n; i++) {
        for(let j = 0; j < m; j++) {
            copy[i][j] = 1
        }
      }
      return copy
    })
  }

  const generateWalls = async () => {
    clearPaths()
    // Reset All Walls to 0 for animation
    setGrid(prevState => {
      const copy = [...prevState]
      for(let i = 0; i < n; i++) {
        for(let j = 0; j < m; j++) {
          if(copy[i][j] === WALL) {
            copy[i][j] = UNVISITED
          }
        }
      }
      return copy
    })
    await new Promise(r => setTimeout(r, 100));
    setGrid(prevState => {
      const copy = [...prevState]
      for(let i = 0; i < n; i++) {
        for(let j = 0; j < m; j++) {
          if(copy[i][j] !== START && copy[i][j] !== END && copy[i][j] !== WEIGHT && Math.random() < 0.175) {
            copy[i][j] = WALL
          }
        }
      }
      return copy
    })
  }

  const startAlgo = (algo) => {
    setRunning(true)
    clearPaths()
    switch(algo) {
      case 0:
        bfs(grid, updateCell, start[0], start[1], () => setRunning(false))
        break;
      case 1:
        dfs(grid, updateCell, start[0], start[1], () => setRunning(false))
        break;
      case 2:
        bidirectional(grid, updateCell, start, end, () => setRunning(false))
        break;
      default:
        console.log("Invalid switch case")
    }
  }

  const handleOnClick = (e, i, j) => {
    if(running)
      return
    updateWeight(i, j, 1)
    if(keyPressed === 'q') {
      if(grid[i][j] === END) return
      updateCell(start[0], start[1], UNVISITED)
      setStart([i, j])
      updateCell(i, j, START)
    } else if(keyPressed === 'w') {
      if(grid[i][j] === START) return
      updateCell(end[0], end[1], UNVISITED)
      setEnd([i, j])
      updateCell(i, j, END)
    } else if(grid[i][j] === START || grid[i][j] === END){
      return
    } else if(keyPressed === 'Shift') {
      updateCell(i, j, UNVISITED)
    } else if(keyPressed === 'a') {
      updateCell(i, j, WEIGHT)
      updateWeight(i, j, 10)
    } else {
      updateCell(i, j, WALL)
    }
  }

  const handleKeyDown = (e) => {
    setKeyPressed(e.key)
  }

  const handleKeyUp = (e) => {
    setKeyPressed('')
  }

  useEffect(() => {
    randomStartEnd()
    if(window.innerWidth < 800) {
      alert("Website is not fully compatible on mobile devices, you may experience bugs and missing features. For the full experience, please visit the website on a desktop or a laptop.")
    }
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    }
  }, []);

  return (
    <Box>
      <Typography variant="h4" sx={{textAlign: "center", mt: 6}}> Pathfinding Algorithm Visualization </Typography>
      <Grid container justifyContent="center" spacing={1.5} mt={1}>
        <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
          <Box mr={1}>
            <SelectAlgo startAlgo={startAlgo} setMessage={setMessage} running={running} />
          </Box>
          <Box>
            <Tooltip title={<HelpBox/>}>
              <IconButton>
                <HelpIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Grid>
        {/* <Button variant="contained" color="secondary" disabled={running} onClick={() => console.log("Create Weighted Cell")}> Create Weight (WIP) </Button> */}
        <Grid item xs={12} display="flex" justifyContent="center">
          <ButtonGroup variant="outlined" orientation={window.innerWidth<800 ? "vertical" : "horizontal"}>
            <Button variant="outlined" disabled={running} onClick={resetGrid}> Reset </Button>
            <Button variant="outlined" disabled={running} onClick={clearPaths}> Clear Path </Button>
            <Button variant="outlined" disabled={running} onClick={randomStartEnd}> Random Start/End </Button>
            <Button variant="outlined" disabled={running} onClick={generateWalls}> Random Walls </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
      <Typography variant="body1" textAlign="center" mt={2}> {message} </Typography>
      {/* Grid cells */}
      <Box sx={{display: "flex", flexDirection: "column", alignContents: "center", justifyContent: "center", mt: 4}}>
        { grid.map((row, i) => {
              return (
              <Box key={`row${i}`} sx={{display: "flex", justifyContent: "center"}}>
                { row.map((val, j) =>
                    <Node key={`col${j}`} val={val} i={i} j={j} weight={weight} handleOnClick={handleOnClick}></Node>
                  )
                }
              </Box>
            )})
        }
      </Box>
      {/* Legend */}
      <Legend />
    </Box>
  )
}

export default App;
