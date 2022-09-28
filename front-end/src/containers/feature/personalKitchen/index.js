import React, { useEffect, useState } from 'react'
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
import AxiosV1 from '../../../api/axiosV1'
import personalKitchenAPI from '../../../api/def/personalKitchen'
import { callApi } from '../../../api/util/callAPI'

const PersonalKitchen = (props) => {
  const history = useHistory()
  const theme = useTheme()

  const GetKitchen = () => {
    const [recipeList, setRecipeList] = useState([])
    const [cancelToken] = useState(AxiosV1.CancelToken.source())
    useEffect(() => {
      callApi({
        apiConfig: personalKitchenAPI.personalKitchen(),
        onStart: () => {},
        onSuccess: (res) => {
          setRecipeList(res.data.recipes)
        },
        onError: (err) => {},
        onFinally: () => {},
      })
      return () => {
        cancelToken.cancel('Request cancel.')
      }
    }, [cancelToken])
    return recipeList.map((recipe) => {
      return (
        <Grid key={recipe._id}>
          <RecipeCard
            recipeID={recipe._id}
            title={recipe.title}
            description="Description Placeholder"
            rating={recipe.rating}
          />
        </Grid>
      )
    })
  }

  return (
    <Box
      height="inherit"
      sx={{
        backgroundColor: '#FBEEDB',
      }}
    >
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            display: 'flex',
            backgroundColor: '#FBEEDB',
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
              {GetKitchen()}
            </Grid>
          </Box>
        </Box>
      </ThemeProvider>
    </Box>
  )
}

PersonalKitchen.propTypes = {}

export default PersonalKitchen
