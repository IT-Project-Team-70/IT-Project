import React, { useContext, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import { ThemeProvider } from '@mui/material'
import useTheme from '../../../css/muiTheme/index'
import RecipeCard from '../../recipe/recipeCard'
import CheckboxList from './checkboxList'
import AxiosV1 from '../../../api/axiosV1'
import { callApi } from '../../../api/util/callAPI'
import everyonesKitchenAPI from '../../../api/def/everyonesKitchen'
import LoadingSpinner from '../../../component/loadingSpinner'
import ReportProblemIcon from '@mui/icons-material/ReportProblem'
import { useHistory } from 'react-router-dom'
import { LOGIN } from '../../../routes/routeConstant'
import { Context } from '../../../stores/userStore'

const EveryonesKitchen = (props) => {
  const history = useHistory()
  const [userContext] = useContext(Context)
  const theme = useTheme()
  const [recipeList, setRecipeList] = useState([])
  const [ekStatus, setEkStatus] = useState('initial')
  const [error, setError] = useState({ error: false, errorMessage: '' })
  const [reloadTrigger, setReloadTrigger] = useState(-1)
  useEffect(() => {
    if (userContext.userState && !userContext.userState.login) {
      history.push(LOGIN)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userContext.userState])

  const GetKitchen = () => {
    const [cancelToken] = useState(AxiosV1.CancelToken.source())
    useEffect(() => {
      setEkStatus('loading')
      callApi({
        apiConfig: everyonesKitchenAPI.getEveryonesKitchen(),
        onStart: () => {},
        onSuccess: (res) => {
          setEkStatus('success')
          setRecipeList(res.data)
        },
        onError: (err) => {
          setEkStatus('error')
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
    }, [cancelToken, reloadTrigger])
    return recipeList.map((recipe) => {
      return (
        <Grid key={recipe._id}>
          <RecipeCard
            userId={recipe.userId}
            recipeID={recipe._id}
            title={recipe.title}
            description={recipe.description}
            rating={recipe.averageRating}
            disableRating={false}
            image={recipe.image.data}
            hasToolButton={false}
            isfavorite={recipe.isfavorite}
            onChange={() => {
              setReloadTrigger((prev) => prev + 1)
            }}
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
                <CheckboxList setRecipes={setRecipeList} />
              </List>
            </Box>
            <Box sx={{ height: '100%', marginLeft: 1 }}>
              <Typography variant="h6" fontWeight="300" sx={{ m: 1 }}>
                Trending
              </Typography>
              <Grid container gap={1}>
                {GetKitchen()}
              </Grid>
            </Box>
          </Box>
        )}
        <LoadingSpinner isLoading={ekStatus === 'loading'} />
      </ThemeProvider>
    </Box>
  )
}

EveryonesKitchen.propTypes = {}

export default EveryonesKitchen
