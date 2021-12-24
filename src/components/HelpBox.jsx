import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { UNVISITED, VISITED, PATH, START, END, WALL, WEIGHT } from '../constants';
import Node from '../Node'

const HelpBox = () => {
  return (
    <Box>
      <Stack direction="row" spacing={1} justifyContent="center" alignItems="center" mt={1}>
        <Node val={START} /> 
        <Node val={END} /> 
      </Stack>
      <Typography variant="subtitle1"> Drag and drop to move the start and end points </Typography>
      <Stack direction="row" spacing={1} justifyContent="center" alignItems="center" mt={1}>
        <Node val={WALL}/> 
      </Stack>
      <Typography variant="subtitle1"> Hold left click to create walls, or hold middle mouse to delete walls </Typography>
      <Stack direction="row" spacing={1} justifyContent="center" alignItems="center" mt={1}>
        <Node val={WEIGHT}/> 
      </Stack>
      <Typography variant="subtitle1"> Toggle weight button and left click to create weighted cells (weight cost is 10) </Typography>
    </Box>
  )
}

export default HelpBox
