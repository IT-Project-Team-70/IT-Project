import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import { Button, ThemeProvider } from '@mui/material'
import useTheme from '../../../css/muiTheme'
import RecipeCard from '../../recipe/recipeCard'
import foodImage from './FoodImage.webp'
import callApi from '../../../api/util/callAPI'
import landingAPI from '../../../api/def/landing'
import AxiosV1 from '../../../api/axiosV1'
import LoadingSpinner from '../../../component/loadingSpinner'
import ReportProblemIcon from '@mui/icons-material/ReportProblem'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { useHistory } from 'react-router-dom'
import { HOW_TO_UPLOAD } from '../../../routes/routeConstant'

const FrontPage = (props) => {
  const theme = useTheme()
  const [recipeList, setRecipeList] = useState([])
  const [frontPageStatus, setFrontPageStatus] = useState('initial')
  const [error, setError] = React.useState({ error: false, errorMessage: '' })
  const [cancelToken] = useState(AxiosV1.CancelToken.source())
  const history = useHistory()

  useEffect(() => {
    if (frontPageStatus === 'initial') {
      setFrontPageStatus('loading')
      callApi({
        apiConfig: landingAPI.getLanding(),
        onStart: () => {},
        onSuccess: (res) => {
          setRecipeList(res.data.demoRecipes)
          setFrontPageStatus('success')
        },
        onError: (err) => {
          setFrontPageStatus('error')
          setError({ error: true, errorMessage: err.response.data })
        },
        onFinally: () => {},
      })
      return () => {
        cancelToken.cancel('Request cancel.')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cancelToken])
  return (
    <Box
      height="inherit"
      sx={{
        backgroundColor: '#FBEEDB',
        overflow: 'auto',
      }}
    >
      <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex' }}>
          <Box
            component="img"
            sx={{
              height: '50vw',
              width: '50vw',
              maxHeight: '550px',
              minHeight: '550px',
              objectFit: 'cover',
            }}
            alt="Background Image"
            src={foodImage}
          />
          <Box
            sx={{
              height: 550,
              width: '50%',
            }}
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <Typography
              textAlign={'center'}
              fontSize={30}
              fontWeight={'bold'}
              fontFamily={'Roboto'}
            >
              DON&apos;T FORGET YOUR RECIPE
            </Typography>
            <Typography
              textAlign={'center'}
              fontSize={24}
              fontWeight={'regular'}
              fontFamily={'Roboto'}
            >
              Keep All Your Recipes Here
              <br />
              And Your Friends&apos; Too
            </Typography>
          </Box>
        </Box>
        <Box sx={{ m: 5 }}>
          <Typography textAlign={'center'} fontSize={20} fontWeight={'medium'}>
            SEARCH FOR RECIPES HERE
          </Typography>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '110ch' },
            }}
            noValidate
            autoComplete="off"
            display="flex"
            justifyContent="center"
          >
            <TextField
              id="search"
              label="Search"
              variant="outlined"
              sx={{ bgcolor: '#FFFFFF' }}
            />
          </Box>
        </Box>
        <Box
          width="100%"
          component="div"
          sx={{ overflow: 'auto', position: 'relative' }}
          display="flex"
          alignContent="center"
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
            recipeList.map((recipe) => (
              <RecipeCard
                key={recipe._id}
                recipeID={recipe._id}
                title={recipe.title}
                description={recipe.description}
                rating={recipe.averageRating}
                hasFavorite={false}
                image={recipe.image.data}
              />
            ))
          )}
          <LoadingSpinner isLoading={frontPageStatus === 'loading'} />
        </Box>
        <Box
          width="100%"
          display="flex"
          flexDirection="row"
          justifyContent="center"
          p={6}
        >
          <Button
            sx={{ color: 'black' }}
            onClick={() => {
              history.push(HOW_TO_UPLOAD)
            }}
          >
            <PlayArrowIcon sx={{ height: '30px', width: '30px' }} />
            <Typography
              textAlign={'center'}
              fontSize={30}
              fontFamily={'Roboto'}
            >
              How to upload your recipe
            </Typography>
          </Button>
        </Box>
      </ThemeProvider>
    </Box>
  )
}

FrontPage.propTypes = {}

export default FrontPage
