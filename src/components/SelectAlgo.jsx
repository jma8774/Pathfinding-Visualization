import React from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

const messages = [
  "BFS guarantee that we will travel the shortest path in an unweighted graph",
  "DFS does not guarantee that we will travel the shortest path",
  "Bidirectional search will find the shortest path between 2 nodes in an unweighted graph",
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
        </Select>
      </FormControl>
      <Button onClick={() => startAlgo(algo)} variant="contained" size="large" disabled={running}> Start </Button>
    </Box>
  );
}

export default SelectAlgo