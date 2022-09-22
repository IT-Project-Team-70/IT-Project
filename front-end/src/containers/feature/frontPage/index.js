import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import { ThemeProvider } from '@mui/material'
import useTheme from '../../../css/muiTheme'
import RecipeCard from '../../recipe/recipeCard'
import foodImage from './FoodImage.webp'
import { useHistory } from 'react-router-dom'
import { RECIPE } from '../../../routes/routeConstant'

const FrontPage = (props) => {
  const theme = useTheme()
  const history = useHistory()

  return (
    <Box
      height="inherit"
      sx={{
        backgroundColor: '#FBEEDB',
      }}
    >
      <ThemeProvider theme={theme}>
        <Box backgroundColor="#FBEEDB">
          <Box sx={{ display: 'flex' }}>
            <Box
              component="img"
              sx={{
                height: 550,
                width: '50%',
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
            <Typography
              textAlign={'center'}
              fontSize={20}
              fontWeight={'medium'}
            >
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
            component="div"
            sx={{ overflow: 'auto' }}
            display="flex"
            alignContent="center"
          >
            <Box
              onClick={() =>
                history.push(RECIPE.replace(':id', '6329a694613c6d5270842507'))
              }
            >
              <RecipeCard
                recipeID="6329a694613c6d5270842507"
                title="Noodles"
                description="Yum"
                rating={4}
              />
            </Box>
            <Box
              onClick={() =>
                history.push(RECIPE.replace(':id', '6329a694613c6d5270842507'))
              }
            >
              <RecipeCard
                recipeID="6329a694613c6d5270842507"
                title="Noodles"
                description="Yum"
                rating={4}
              />
            </Box>
            <Box
              onClick={() =>
                history.push(RECIPE.replace(':id', '6329a694613c6d5270842507'))
              }
            >
              <RecipeCard
                recipeID="6329a694613c6d5270842507"
                title="Noodles"
                description="Yum"
                rating={4}
              />
            </Box>
            <Box
              onClick={() =>
                history.push(RECIPE.replace(':id', '6329a694613c6d5270842507'))
              }
            >
              <RecipeCard
                recipeID="6329a694613c6d5270842507"
                title="Noodles"
                description="Yum"
                rating={4}
              />
            </Box>
            <Box
              onClick={() =>
                history.push(RECIPE.replace(':id', '6329a694613c6d5270842507'))
              }
            >
              <RecipeCard
                recipeID="6329a694613c6d5270842507"
                title="Noodles"
                description="Yum"
                rating={4}
              />
            </Box>
            <Box
              onClick={() =>
                history.push(RECIPE.replace(':id', '6329a694613c6d5270842507'))
              }
            >
              <RecipeCard
                recipeID="6329a694613c6d5270842507"
                title="Noodles"
                description="Yum"
                rating={4}
              />
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </Box>
  )
}

FrontPage.propTypes = {}

export default FrontPage
