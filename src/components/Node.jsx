import React from 'react'
import Box from '@mui/material/Box';
import { keyframes } from '@mui/system';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { START, END, WALL, WEIGHT } from '../constants';
// UNVISITED, VISITED, PATH, 

const def = keyframes`  
  from {
  }
  to {
  }
`;

const startEnd = keyframes`  
0% {
  transform: scale(0.6);
}
100% {
  transform: scale(1);
}
`;

const visited = keyframes`
  0% {
    transform: scale(0.2);
  }
  100% {
    transform: scale(1);
  }
`;

const path = keyframes`
  0% {
    transform: scale(0.15);
  }
  75% {
    transform: scale(1.1);
  }
  100% {
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

const weighted = keyframes`
0% {
  transform: scale(0.3);
}

to {
  transform: scale(1);
}
`;


const background = ["white", "#ABEBC6", "#85C1E9", "#FFBD33", "#FF5733", "#1C2833", "#8E44AD"]
const animation = [def, visited, path, startEnd, startEnd, walls, weighted]

const Node = (props) => {
  const {val, i, j, weight, handleOnClick} = props
  // console.log("Node Rerender")

  return (
    <Box onClick={(e) => handleOnClick &&  handleOnClick(e, i, j)} draggable={false} sx={{
      display: "flex", 
      justifyContent: "center",
      alignItems: "center",
      width: 30, 
      height: 30, 
      border: "1px solid rgb(175, 216, 248)",
      animation: `${animation[val]} 0.5s 1 ease-out`,
      backgroundColor: background[val],
    }}>
      { val === START && < PlayArrowIcon/>}
      { val === END && < CloseIcon/>}
      { (val !== WALL) && (val === WEIGHT || (weight > 1)) && <AddIcon/>}
    </Box>
  )
}

export default React.memo(Node)
