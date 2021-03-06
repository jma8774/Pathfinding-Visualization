import React from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

const messages = [
  "BFS is an unweighted search and it guarantee that we will travel the shortest path in an unweighted graph",
  "DFS is an unweighted search and does not guarantee that we will travel the shortest path",
  "Bidirectional is an unweighted search and it will traverse from 2 nodes at a time",
  "Dijkstra's algorithm will find the path with the shortest COST in a weighted graph otherwise it's just a BFS (try blocking near the end point with purple cells)",
  "A* just like Dijkstra, is a weighted search and is one of the fastest ones by making use of a heuristic function to guide it",
]
const SelectAlgo = (props) => {
  const {startAlgo, setMessage, running} = props
  const [algo, setAlgo] = React.useState(0);

  const handleChange = (event) => {
    setAlgo(event.target.value);
    setMessage(messages[event.target.value])
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <FormControl size="small" variant="filled" disabled={running} sx={{mr: 2, minWidth: 175}}>
        <InputLabel>Search Algorithm</InputLabel>
        <Select
          value={algo}
          label="Search Algorithm"
          onChange={handleChange}
        >
          <MenuItem value={0}> BFS </MenuItem>
          <MenuItem value={1}> DFS </MenuItem>
          <MenuItem value={2}> Bidirectional </MenuItem>
          <MenuItem value={3}> Dijkstra </MenuItem>
          <MenuItem value={4}> A* </MenuItem>
        </Select>
      </FormControl>
      <Button onClick={() => startAlgo(algo)} variant="contained" size="large" disabled={running}> Start </Button>
    </Box>
  );
}

export default SelectAlgo