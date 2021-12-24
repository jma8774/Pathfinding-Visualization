import React from 'react'
import Box from '@mui/material/Box';
import { keyframes } from '@mui/system';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CloseIcon from '@mui/icons-material/Close';

const UNVISITED = 0
const VISITED = 1
const PATH = 2
const START = 3
const END = 4
const WALL = 5

const placeholder = keyframes`
  from {
  }

  to {
  }
`;

const visited = keyframes`
  0% {
    transform: scale(0);
  }

  to {
    transform: scale(1);
  }
`;

const path = keyframes`
  0% {
    transform: scale(0.1);
  }

  to {
    transform: scale(1);
  }
`;

const walls = keyframes`
0% {
  transform: scale(0.2);
}

to {
  transform: scale(1);
}
`;

const background = ["white", "#ABEBC6", "#85C1E9", "#FFBD33", "#FF5733", "#1C2833"]
const animation = [placeholder, visited, path, placeholder, placeholder, walls]

const Node = (props) => {
  const {val} = props
  return (
    <Box sx={{
      display: "flex", 
      justifyContent: "center",
      alignItems: "center",
      width: 30, 
      height: 30, 
      border: "1px solid rgb(175, 216, 248)",
      animation: `${animation[val]} 0.5s 1 linear`,
      backgroundColor: background[val]
    }}>
      { val === START && < PlayArrowIcon/>}
      { val === END && < CloseIcon/>}
    </Box>
  )
}

export default Node
