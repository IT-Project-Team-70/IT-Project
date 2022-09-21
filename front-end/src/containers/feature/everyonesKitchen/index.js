import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import { ThemeProvider } from '@mui/material'
import useTheme from '../../../css/muiTheme/index'
import RecipeCard from '../../recipe/recipeCard'
import CheckboxList from './CheckboxList'
import AxiosV1 from '../../../api/axiosV1'
import personalKitchenAPI from '../../../api/def/personalKitchen'
import { callApi } from '../../../api/util/callAPI'

const EveryonesKitchen = (props) => {
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
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{ marginTop: 3 }}
              >
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
              {GetKitchen()}
            </Grid>
          </Box>
        </Box>
      </ThemeProvider>
    </Box>
  )
}

EveryonesKitchen.propTypes = {}

export default EveryonesKitchen
