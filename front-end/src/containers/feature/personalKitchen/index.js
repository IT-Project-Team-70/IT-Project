import React, { useContext, useEffect, useState } from 'react'
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
import { ThemeProvider, Typography } from '@mui/material'
import useTheme from '../../../css/muiTheme/index'
import RecipeCard from '../../recipe/recipeCard'
import { useHistory } from 'react-router-dom'
import { LOGIN, UPLOAD_RECIPE } from '../../../routes/routeConstant'
import AxiosV1 from '../../../api/axiosV1'
import personalKitchenAPI from '../../../api/def/personalKitchen'
import { callApi } from '../../../api/util/callAPI'
import { Context } from '../../../stores/userStore'
import ReportProblemIcon from '@mui/icons-material/ReportProblem'

const PersonalKitchen = (props) => {
  const history = useHistory()
  const theme = useTheme()
  const [userContext] = useContext(Context)
  const [pkStatus, setPkStatus] = useState('initial')
  const [error, setError] = React.useState({ error: false, errorMessage: '' })
  const GetKitchen = () => {
    const [recipeList, setRecipeList] = useState([])
    const [cancelToken] = useState(AxiosV1.CancelToken.source())
    useEffect(() => {
      if (pkStatus === 'initial') {
        setPkStatus('loading')
        callApi({
          apiConfig: personalKitchenAPI.personalKitchen(),
          onStart: () => {},
          onSuccess: (res) => {
            setRecipeList(res.data.recipes)
            setPkStatus('success')
          },
          onError: (err) => {
            setPkStatus('error')
            setError({ error: true, errorMessage: err.response.data })
            if (err.response.status === 401) {
              history.push(LOGIN)
            }
          },
          onFinally: () => {},
        })
        return () => {
          cancelToken.cancel('Request cancel.')
        }
      }
    }, [cancelToken])
    return recipeList.map((recipe) => {
      return (
        recipe && (
          <Grid key={recipe._id}>
            <RecipeCard
              recipeID={recipe._id}
              title={recipe.title}
              description={recipe.description}
              rating={recipe.rating}
              image={recipe.image.data}
              hasToolButton={true}
              isfavorite={recipe.isfavorite}
            />
          </Grid>
        )
      )
    })
  }
  useEffect(() => {
    if (userContext.userState && !userContext.userState.login) {
      history.push(LOGIN)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userContext.userState])

  return (
    <Box
      height="inherit"
      sx={{
        backgroundColor: '#FBEEDB',
      }}
    >
      <ThemeProvider theme={theme}>
        {error.error ? (
          <Box
            display="flex"
            flexDirection={'column'}
            alignItems="center"
            height="inherit"
            justifyContent="center"
          >
            <ReportProblemIcon fontSize="large" />
            Oops something went wrong!
            <Typography
              variant="body"
              color="primary"
              sx={{ textAlign: 'center' }}
            >
              {error.message}
            </Typography>
          </Box>
        ) : (
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
        )}
      </ThemeProvider>
    </Box>
  )
}

PersonalKitchen.propTypes = {}

export default PersonalKitchen
