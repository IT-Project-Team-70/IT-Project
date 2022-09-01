import React, { useState } from 'react'
// import useMediaQuery from '@mui/material/useMediaQuery'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
// import { useTheme } from '@mui/material'
import RecipeDetail from './recipeDetail'
import Ingredient from './ingredient'
import Procedure from './procedure'

const UploadRecipe = () => {
  const [noneInputData, setNoneInputData] = useState({})
  const [procedureError, setProcedureError] = useState(false)
  const handleSubmit = (event) => {
    //check if procedure is empty
    if (noneInputData.procedure && noneInputData.procedure !== '') {
      setProcedureError(false)
      const data = new FormData(event.currentTarget)
      for (var pair of data.entries()) {
        console.log(pair[0], pair[1])
      }
      console.log(noneInputData)
    } else {
      //procedure is empty
      setProcedureError(true)
    }

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
          <Grid item xs={12} sm={12} md={4} lg={4} height="inherit">
            <RecipeDetail
              onChange={(data) => {
                setNoneInputData((prev) => ({ ...prev, ...data }))
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} height="inherit">
            <Ingredient
              onChange={(data) => {
                setNoneInputData((prev) => ({ ...prev, indegrients: data }))
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} height="inherit">
            <Procedure
              onChange={(data) => {
                setNoneInputData((prev) => ({ ...prev, procedure: data }))
              }}
              error={procedureError}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default UploadRecipe
