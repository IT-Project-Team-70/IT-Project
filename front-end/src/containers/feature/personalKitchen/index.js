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
import LoadingSpinner from '../../../component/loadingSpinner'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'

const PersonalKitchen = (props) => {
  const history = useHistory()
  const theme = useTheme()
  const [userContext] = useContext(Context)
  const [pkStatus, setPkStatus] = useState('initial')
  const [error, setError] = useState({ error: false, errorMessage: '' })
  const [buttonSatus, setButtonSatus] = useState('Personal')
  const [apiConfig, setApiConfig] = useState(
    personalKitchenAPI.personalKitchen()
  )
  const [reloadTrigger, setReloadTrigger] = useState(-1)
  const GetKitchen = () => {
    const [recipeList, setRecipeList] = useState([])
    const [cancelToken] = useState(AxiosV1.CancelToken.source())
    useEffect(() => {
      setPkStatus('loading')
      callApi({
        apiConfig: apiConfig,
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cancelToken, reloadTrigger, apiConfig])
    return recipeList.map((recipe) => {
      return (
        recipe && (
          <Grid key={recipe._id}>
            <RecipeCard
              recipeID={recipe._id}
              title={recipe.title}
              description={recipe.description}
              rating={recipe.averageRating}
              image={recipe.image.data}
              disableRating={buttonSatus === 'Admin'}
              hasToolButton={
                buttonSatus === 'Personal' || buttonSatus === 'Admin'
              }
              isfavorite={recipe.isfavorite}
              hasFavorite={buttonSatus !== 'Admin'}
              onChange={() => {
                setReloadTrigger((prev) => prev + 1)
              }}
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
    <ThemeProvider theme={theme}>
      <Box
        height="inherit"
        sx={{
          backgroundColor: '#FBEEDB',
        }}
      >
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
              height: 'inherit',
              display: 'flex',
              backgroundColor: '#FBEEDB',
            }}
          >
            <Box>
              <List sx={{ width: '240px' }}>
                <ListItem disablePadding>
                  <ListItemButton
                    sx={{
                      '&.Mui-selected': {
                        backgroundColor: 'rgba(224, 71, 11, 0.7)',
                      },
                      '&.Mui-selected:hover': {
                        backgroundColor: 'rgba(224, 71, 11, 0.45)',
                      },
                    }}
                    selected={buttonSatus === 'Personal'}
                    onClick={() => {
                      setApiConfig(personalKitchenAPI.personalKitchen())
                      setButtonSatus('Personal')
                    }}
                  >
                    <ListItemIcon>
                      <MenuBookIcon />
                    </ListItemIcon>
                    <ListItemText primary={'My Recipes'} />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    selected={buttonSatus === 'Favorite'}
                    sx={{
                      '&.Mui-selected': {
                        backgroundColor: 'rgba(224, 71, 11, 0.7)',
                      },
                      '&.Mui-selected:hover': {
                        backgroundColor: 'rgba(224, 71, 11, 0.45)',
                      },
                    }}
                    onClick={() => {
                      setApiConfig(personalKitchenAPI.getFavorites())
                      setButtonSatus('Favorite')
                    }}
                  >
                    <ListItemIcon>
                      <FastfoodIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Favourites'} />
                  </ListItemButton>
                </ListItem>
                {userContext &&
                  userContext?.userState?.userInfo?.role === 'admin' && (
                    <ListItem disablePadding>
                      <ListItemButton
                        selected={buttonSatus === 'Admin'}
                        sx={{
                          '&.Mui-selected': {
                            backgroundColor: 'rgba(224, 71, 11, 0.7)',
                          },
                          '&.Mui-selected:hover': {
                            backgroundColor: 'rgba(224, 71, 11, 0.45)',
                          },
                        }}
                        onClick={() => {
                          setApiConfig(personalKitchenAPI.getAdmin())
                          setButtonSatus('Admin')
                        }}
                      >
                        <ListItemIcon>
                          <AdminPanelSettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Admin'} />
                      </ListItemButton>
                    </ListItem>
                  )}
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
            <Box sx={{ height: 'inherit', marginLeft: 1, overflowY: 'auto' }}>
              <Grid container gap={1}>
                {GetKitchen()}
              </Grid>
            </Box>
          </Box>
        )}
        <LoadingSpinner isLoading={pkStatus === 'loading'} />
      </Box>
    </ThemeProvider>
  )
}

PersonalKitchen.propTypes = {}

export default PersonalKitchen
