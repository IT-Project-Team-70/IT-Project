import * as React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import { ThemeProvider } from '@mui/material'
import useTheme from '../../../css/muiTheme/index'
import RecipeCard from '../../recipe/recipeCard'
import CheckboxList from './CheckboxList'

const EveryonesKitchen = (props) => {
  const theme = useTheme()

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          backgroundColor: '#FBEEDB',
        }}
      >
        <Box sx={{ paddingLeft: 1 }}>
          <List sx={{ width: '230px' }}>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ marginTop: 3, marginBottom: 3 }}
            >
              Filter Recipe:
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              By Courses:
            </Typography>
            <CheckboxList />
            <Typography variant="body1" fontWeight="bold" sx={{ marginTop: 3 }}>
              By Categories:
            </Typography>
            <CheckboxList />
          </List>
        </Box>
        <Box sx={{ height: '100%', marginLeft: 1 }}>
          <Typography variant="h6" fontWeight="300" sx={{ m: 1 }}>
            Trending
          </Typography>
          <Grid container gap={1}>
            <Grid>
              <RecipeCard />
            </Grid>
            <Grid>
              <RecipeCard />
            </Grid>
            <Grid>
              <RecipeCard />
            </Grid>
            <Grid>
              <RecipeCard />
            </Grid>
            <Grid>
              <RecipeCard />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

EveryonesKitchen.propTypes = {}

export default EveryonesKitchen
