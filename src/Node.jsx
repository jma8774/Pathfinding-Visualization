import React from 'react'
import Box from '@mui/material/Box';
import { keyframes } from '@mui/system';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { UNVISITED, VISITED, PATH, START, END, WALL, WEIGHT } from './constants';


const def = keyframes`  
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

const weight = keyframes`
0% {
  transform: scale(0.3);
}

to {
  transform: scale(1);
}
`;


const background = ["white", "#ABEBC6", "#85C1E9", "#FFBD33", "#FF5733", "#1C2833", "#8E44AD"]
const animation = [def, visited, path, def, def, walls, weight]

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
      { val === WEIGHT && <AddIcon/>}
    </Box>
  )
}

export default Node
