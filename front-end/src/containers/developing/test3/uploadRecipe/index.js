import React, { useState } from 'react'
// import useMediaQuery from '@mui/material/useMediaQuery'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
// import { useTheme } from '@mui/material'
import RecipeDetail from './recipeDetail'

const Form = () => {
  const [noneInputData, setNoneInputData] = useState({})
  const handleSubmit = (event) => {
    const data = new FormData(event.currentTarget)
    for (var pair of data.entries()) {
      console.log(pair[0], pair[1])
    }
    console.log(noneInputData)
    event.preventDefault()
  }

  // const muitheme = useTheme()
  // const isMd = useMediaQuery(muitheme.breakpoints.up('md'), {
  //   defaultMatches: true,
  // })

  return (
    <Box height="inherit">
      <Box
        component="form"
        onSubmit={handleSubmit}
        autoComplete="off"
        style={{ height: '100%' }}
      >
        <Box
          padding={1}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          <Box paddingRight={2}>
            <Button
              variant="contained"
              color="primary"
              size="medium"
              type="submit"
            >
              Save New Recipe
            </Button>
          </Box>
          <Box>
            <Button variant="text" color="primary" size="medium">
              Cancel
            </Button>
          </Box>
        </Box>
        <Grid
          container
          height="calc(100% - 52.5px)"
          sx={{ paddingLeft: '8px' }}
        >
          <RecipeDetail
            onChange={(data) => {
              setNoneInputData((prev) => ({ ...prev, ...data }))
            }}
          />
        </Grid>
      </Box>
    </Box>
  )
}

export default Form
