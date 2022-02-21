import React, { useState, useEffect, useCallback, useRef} from 'react';
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
import Slider from '@mui/material/Slider';
import bfs from './algos/BFS'
import dfs from './algos/DFS'
import bidirectional from './algos/Bidirectional'
import dijkstra from './algos/Dijkstra'
import astar from './algos/Astar'


function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function App() {
  const [grid, setGrid] = useState(Array(n).fill(UNVISITED).map(() => new Array(m).fill(UNVISITED)))
  const [weight, setWeight] = useState(Array(n).fill(1).map(() => new Array(m).fill(1)))
  const [start, setStart] = useState([parseInt(n/2), parseInt(m/3)])
  const [end, setEnd] = useState([parseInt(n/2), parseInt(m/(1.5))])
  const [running, setRunning] = useState(false)
  const [speed, setSpeed] = React.useState(25);
  const [message, setMessage] = useState('Hi there, welcome to the pathfinding visualizer! Press the question mark for instructions on how to add/delete grids.')
  const [keyPressed, setKeyPressed] = useState('')
  const runningRef = useRef(running)

  const updateWeight = (i, j, val) => {
    setWeight(prevState => {
      const newWeight = [...prevState]
      newWeight[i][j] = val
      return newWeight
    })
  }

  const updateCell = (i, j, val) => {
    if(i < 0 || i > n-1 || j < 0 || j > m-1) {
      console.log("BAD UPDATE CELL", i, j, val)
      return
    }
    setGrid(prevState => {
      const newGrid = [...prevState]
      newGrid[i][j] = val
      return newGrid
    })
  }

  const updateStart = (i, j) => {
    updateCell(start[0], start[1], UNVISITED)
    updateWeight(start[0], start[1], 1)
    const newStart = [i, j]
    setStart(newStart)
    updateCell(newStart[0], newStart[1], START)
    updateWeight(newStart[0], newStart[1], 1)
  }

  const updateEnd = (i, j) => {
    updateCell(end[0], end[1], UNVISITED)
    updateWeight(end[0], end[1], 1)
    const newEnd = [i, j]
    setEnd(newEnd)
    updateCell(newEnd[0], newEnd[1], END)
    updateWeight(newEnd[0], newEnd[1], 1)
  }

  const randomStartEnd = () => {
    clearPaths()
    updateStart(getRandomInt(n), getRandomInt(m))
    updateEnd(getRandomInt(n), getRandomInt(m))
  }

  const randomWeights = async () => {
    clearPaths()
    setWeight(prevState => {
      const newWeight = [...prevState]
      for(let i = 0; i < n; i++) {
        for(let j = 0; j < m; j++) {
          if(grid[i][j] !== START && grid[i][j] !== END && grid[i][j] !== WALL) {
            const rand = getRandomInt(100)
            newWeight[i][j] = rand < 5 ? 5 : 1
            updateCell(i, j, rand < 5 ? WEIGHT : UNVISITED)
          }
        }
      }
      return newWeight
    })
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

  // Fixed Setup Yikes
  const dijkstraExample = () => {
    resetGrid()

    const start = parseInt(m/3)
    const end = parseInt(m/2)
    
    for(let i = 0; i < m; i ++) {
      updateCell(0, i, WALL)
      updateCell(n-1, i, WALL)
    }
    for(let i = 0; i < n; i ++) {
      updateCell(i, 0, WALL)
      updateCell(i, m-1, WALL)
    }
    for(let i = 1; i < n-6; i ++) {
      updateCell(i, end-2, WEIGHT)
      updateCell(i, end-1, WEIGHT)
      updateWeight(i, end-2, 5)
      updateWeight(i, end-1, 5)
    }
    for(let i = n-4; i < n-1; i ++) {
      updateCell(i, end-2, WEIGHT)
      updateCell(i, end-1, WEIGHT)
      updateWeight(i, end-2, 5)
      updateWeight(i, end-1, 5)
    }
    
    updateStart(parseInt(n/2)-1, start)
    updateEnd(parseInt(n/2)-1, end)
  }

  const startAlgo = (algo) => {
    setRunning(true)
    clearPaths()
    switch(algo) {
      case 0:
        bfs(grid, updateCell, start[0], start[1], () => setRunning(false), speed)
        break;
      case 1:
        dfs(grid, updateCell, start[0], start[1], () => setRunning(false), speed)
        break;
      case 2:
        bidirectional(grid, updateCell, start, end, () => setRunning(false), speed)
        break;
      case 3:
        dijkstra(grid, weight, updateCell, start[0], start[1], () => setRunning(false), speed)
        break;
      case 4:
        astar(grid, weight, updateCell, start, end, () => setRunning(false), speed)
        break;
      default:
        console.log("Invalid switch case")
    }
  }

  const handleOnClick = useCallback( (e, i, j) => {
    // console.log("Function rerender")
    if(running)
      return
    if(keyPressed === 'q') {
      if(grid[i][j] === END) return
      updateStart(i, j)
    } else if(keyPressed === 'w') {
      if(grid[i][j] === START) return
      updateEnd(i, j)
    } else if(grid[i][j] === START || grid[i][j] === END){
      return
    } else if(keyPressed === 'Shift') {
      updateWeight(i, j, 1)
      updateCell(i, j, UNVISITED)
    } else if(keyPressed === 'a') {
      updateWeight(i, j, 5)
      updateCell(i, j, WEIGHT)
    } else {
      updateWeight(i, j, 1)
      updateCell(i, j, WALL)
    }
  }, [start, end, running, keyPressed])

  const handleKeyDown = (e) => {
    if(runningRef.current)
      return
    if(e.key === 'q' || e.key === 'w' || e.key === 'Shift' || e.key === 'a')
      setKeyPressed(e.key)
  }

  const handleKeyUp = (e) => {
    if(runningRef.current)
      return
    if(e.key === 'q' || e.key === 'w' || e.key === 'Shift' || e.key === 'a')
      setKeyPressed('')
  }

  useEffect(() => {
    updateStart(parseInt(n/2)-1, parseInt(m/3))
    updateEnd(parseInt(n/2)-1, parseInt(m/(1.5)))
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

  useEffect(() => {
    runningRef.current = running
  }, [running]);

  return (
    <Box>
      <Typography variant="h4" sx={{textAlign: "center", mt: 2}}> Pathfinding Algorithm Visualization </Typography>
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
        <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
          <Typography variant="body1" sx={{mr: 2}}>
            Animation Delay
          </Typography>
          <Box sx={{width: 200}} display="flex" justifyContent="center" alignItems="center">
            <Slider aria-label="Speed" value={speed} onChange={(e, newSpeed) => {setSpeed(newSpeed)}} valueLabelDisplay="auto" step={0.5} min={0.5} max={50} disabled={running}/>
          </Box>
        </Grid>
        {/* <Button variant="contained" color="secondary" disabled={running} onClick={() => console.log("Create Weighted Cell")}> Create Weight (WIP) </Button> */}
        <Grid item xs={12} display="flex" justifyContent="center">
          <ButtonGroup variant="outlined" orientation={window.innerWidth<800 ? "vertical" : "horizontal"}>
            <Button variant="outlined" disabled={running} onClick={resetGrid}> Clear All </Button>
            <Button variant="outlined" disabled={running} onClick={clearPaths}> Clear Path </Button>
            <Button variant="outlined" disabled={running} onClick={randomStartEnd}> Random Start/End </Button>
            <Button variant="outlined" disabled={running} onClick={generateWalls}> Random Walls </Button>
            <Button variant="outlined" disabled={running} onClick={randomWeights}> Random Weights </Button>
            <Button variant="contained" color="secondary" disabled={running} onClick={dijkstraExample}> Dijkstra Example </Button>
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
                    <Node key={`col${j}`} val={val} i={i} j={j} weight={weight[i][j]} handleOnClick={handleOnClick}></Node>
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
