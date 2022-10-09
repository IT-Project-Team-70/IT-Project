/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
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

const EveryonesKitchen = (props) => {
  const theme = useTheme()
  const [recipeList, setRecipeList] = useState([])
  const [ekStatus, setEkStatus] = useState('initial')
  const [error, setError] = useState({ error: false, errorMessage: '' })

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
        },
        onFinally: () => {},
      })
      return () => {
        cancelToken.cancel('Request cancel.')
      }
    }, [cancelToken])
    return recipeList.map((recipe) => {
      return (
        <Grid
          key={recipe._id}
        >
          <RecipeCard
            recipeID={recipe._id}
            title={recipe.title}
            description={recipe.description}
            rating={recipe.rating}
            image={recipe.image.data}
            hasToolButton={false}
            isfavorite={recipe.isfavorite}
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
        </Box>)}
      <LoadingSpinner isLoading={ekStatus === 'loading'} />
      </ThemeProvider>
    </Box>
  )
}

EveryonesKitchen.propTypes = {}

export default EveryonesKitchen
