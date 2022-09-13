import * as React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import FastfoodIcon from '@mui/icons-material/Fastfood'
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined'
import { ThemeProvider } from '@mui/material'
import useTheme from '../../../css/muiTheme/index'
import RecipeCard from '../../recipe/recipeCard'
import { useHistory } from 'react-router-dom'
import { UPLOAD_RECIPE } from '../../../routes/routeConstant'

const PersonalKitchen = (props) => {
  const history = useHistory()
  const theme = useTheme()
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          height: '105%',
          backgroundColor: '#FFF4CE',
        }}
      >
        <Box>
          <List sx={{ width: '240px' }}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <MenuBookIcon />
                </ListItemIcon>
                <ListItemText primary={'My Recipes'} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <FastfoodIcon />
                </ListItemIcon>
                <ListItemText primary={'Favourites'} />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton onClick={() => history.push(UPLOAD_RECIPE)}>
                <ListItemIcon>
                  <AddCircleOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={'New Recipe'} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
        <Box sx={{ height: '100%', marginLeft: 1 }}>
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

PersonalKitchen.propTypes = {}

export default PersonalKitchen
