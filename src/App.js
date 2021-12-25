import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
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
  const [message, setMessage] = useState('Hi there, welcome to the pathfinding visualizer! If you need help, click on the question mark icon.')

  const updateWeight = (i, j, val) => {
    setWeight(prevState => {
      const copy = [...prevState]
      copy[i][j] = val
      return copy
    })
  }

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
    updateWeight(newStart[0], newStart[1], 0)
    updateWeight(newEnd[0], newEnd[1], 0)
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

  const stopAlgo = () => {
    setRunning(false)
    console.log("STOPPED")
  }

  useEffect(() => {
    randomStartEnd()
    if(window.innerWidth < 800) {
      alert("Website is not compatible on mobile devices, you may experience bugs. For the full experience, please visit the website on a desktop or laptop.")
    }
  }, [])
  
  return (
    <Box>
      <Typography variant="h4" sx={{textAlign: "center", mt: 6}}> Pathfinding Algorithm Visualization </Typography>
      <Grid container justifyContent="center" spacing={1.5} mt={1}>
        <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
          <Box mr={1}>
            <SelectAlgo startAlgo={startAlgo} stopAlgo={stopAlgo} setMessage={setMessage} running={running} />
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
        <Grid item xs={12} md={4} display="flex" justifyContent="center">
          <ButtonGroup variant="outlined" orientation={window.innerWidth<800 ? "vertical" : "horizontal"}>
            <Button variant="outlined" disabled={running} onClick={resetGrid}> Reset </Button>
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
                    <Node key={`col${j}`} val={val} i={i} j={j} weight={weight}></Node>
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
