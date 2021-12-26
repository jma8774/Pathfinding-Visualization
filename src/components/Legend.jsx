import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { VISITED, PATH, START, END, WALL, WEIGHT } from '../constants';
import Node from './Node'

const Legend = () => {
  return (
    <Grid container spacing={1} justifyContent="center" mt={2.5} mb={2}>

      <Grid item>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Node val={START} />
          <Typography ml={1}> 
            Start Point
          </Typography>
        </Box>
      </Grid>

      <Grid item>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Node val={END} />
          <Typography ml={1}> 
            End Point
          </Typography>
        </Box>
      </Grid>
      
      <Grid item>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Node val={VISITED} />
          <Typography ml={1}> 
            Visited
          </Typography>
        </Box>
      </Grid>

      <Grid item>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Node val={PATH} />
          <Typography ml={1}> 
            Path Taken
          </Typography>
        </Box>
      </Grid>

      <Grid item>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Node val={WEIGHT} />
          <Typography ml={1}> 
            Weighted Cell
          </Typography>
        </Box>
      </Grid>

      <Grid item>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Node val={WALL} />
          <Typography ml={1}> 
            Walls
          </Typography>
        </Box>
      </Grid>
    </Grid>
  )
}

export default Legend
