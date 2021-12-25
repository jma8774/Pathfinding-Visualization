import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { START, END, WALL, WEIGHT } from '../constants';
import Node from './Node'

const HelpBox = () => {
  return (
    <Box>
      <Stack direction="row" spacing={1} justifyContent="center" alignItems="center" mt={1}>
        <Node val={START} /> 
        <Node val={END} /> 
      </Stack>
      <Typography variant="subtitle1"> <b>Click</b> and hold the <b>Q</b> key to move start point or the <b>W</b> key to move the end point </Typography>
      <Stack direction="row" spacing={1} justifyContent="center" alignItems="center" mt={1}>
        <Node val={WALL}/> 
      </Stack>
      <Typography variant="subtitle1"> <b>Click</b> to create walls, or hold the <b>SHIFT</b> key to delete </Typography>
      <Stack direction="row" spacing={1} justifyContent="center" alignItems="center" mt={1}>
        <Node val={WEIGHT}/> 
      </Stack>
      <Typography variant="subtitle1"> <b>Click</b> and hold the <b>A</b> key to create weighted cells or hold the <b>SHIFT</b> key to delete (weight cost is 10) </Typography>
    </Box>
  )
}

export default HelpBox
