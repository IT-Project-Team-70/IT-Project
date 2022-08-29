/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'

const Form = () => {
  const theme = useTheme()
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  })
  const [servingNum, setServingNum] = React.useState('')
  const [prepareHour, setPrepareHour] = React.useState('')
  const [prepareMinute, setPrepareMinute] = React.useState('')
  const [courses, setCourses] = React.useState('')
  const [source, setSource] = React.useState('')
  const handleServingChange = (event) => {
    setServingNum(event.target.value)
  }
  const handlePrepareHourChange = (event) => {
    setPrepareHour(event.target.value)
  }
  const handlePrepareMinuteChange = (event) => {
    setPrepareMinute(event.target.value)
  }
  const handleCoursesChange = (event) => {
    setCourses(event.target.value)
  }
  const handleSourceChange = (event) => {
    setSource(event.target.value)
  }

  return (
    <Box display="flex" width="10">
      <Box
        padding={{ xs: 3, sm: 6 }}
        width={'100%'}
        component={Card}
        borderRadius={2}
        boxShadow={4}
        marginBottom={4}
        fullWidth
      >
        <form noValidate autoComplete="off">
          <Grid item xs={12}>
            <Button
              sx={{ height: 54 }}
              variant="contained"
              color="primary"
              size="medium"
            >
              Save New Recipe
            </Button>
          </Grid>
          <Button variant="contained" component="label">
            Upload
            <input hidden accept="image/*" multiple type="file" />
          </Button>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
          >
            <input hidden accept="image/*" type="file" />
            <PhotoCamera />
          </IconButton>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Box width="100%" sx={{ m: 2 }} />
          <Grid container spacing={isMd ? 4 : 2}>
            <Grid item xs={12} sm={6}>
              <TextField
                sx={{ height: 54 }}
                label="Recipe Title"
                variant="outlined"
                color="primary"
                size="medium"
                fullWidth
              />
            </Grid>
            <Box width="100%" />
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="Source">Source</InputLabel>
                <Select
                  labelId="Source"
                  id="Source"
                  value={servingNum}
                  label="Source"
                  onChange={handleServingChange}
                >
                  <MenuItem value={'1-2'}>1-2</MenuItem>
                  <MenuItem value={'3-4'}>3-4</MenuItem>
                  <MenuItem value={'5-6'}>5-6</MenuItem>
                  <MenuItem value={'7-8'}>7-8</MenuItem>
                  <MenuItem value={'8 and more'}>8 and more</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Box width="100%" />
            <Grid item xs={12} sm={6}>
              <dix>Preperation Time</dix>
              <Box width="100%" />
              <FormControl sx={{ minWidth: 100, display: 'inline-block' }}>
                <InputLabel id="PrepareTimeHour"></InputLabel>
                <Select
                  labelId="PrepareTimeHour"
                  id="PrepareTimeHour"
                  value={prepareHour}
                  label="PrepareTimeHour"
                  onChange={handlePrepareHourChange}
                  autoWidth
                >
                  <MenuItem value={'0'}>0 hour</MenuItem>
                  <MenuItem value={'1'}>1 hours</MenuItem>
                  <MenuItem value={'2'}>2 hours</MenuItem>
                  <MenuItem value={'3'}>3 hours</MenuItem>
                  <MenuItem value={'4 and more'}>4 hours and more</MenuItem>
                </Select>
                <Select
                  labelId="PrepareTimeMinute"
                  id="PrepareTimeMinute"
                  value={prepareMinute}
                  label="PrepareTimeMinute"
                  onChange={handlePrepareMinuteChange}
                  autoWidth
                >
                  <MenuItem value={'0'}>0 minute</MenuItem>
                  <MenuItem value={'15'}>15 minutes</MenuItem>
                  <MenuItem value={'30'}>30 minutes</MenuItem>
                  <MenuItem value={'45'}>45 minutes</MenuItem>
                </Select>
              </FormControl>
              <Grid item xs={12}>
                <InputLabel id="Select Courses">Courses</InputLabel>
                <Select
                  labelId="Courses"
                  id="Courses"
                  value={courses}
                  label="Courses"
                  onChange={handleCoursesChange}
                  fullWidth
                >
                  <MenuItem value={'breakfast'}>Breakfast</MenuItem>
                  <MenuItem value={'lunch'}>Lunch</MenuItem>
                  <MenuItem value={'dinner'}>Dinner</MenuItem>
                  <MenuItem value={'desert'}>Desert</MenuItem>
                  <MenuItem value={'drinks'}>Drinks</MenuItem>
                  <MenuItem value={'snacks'}>Snacks</MenuItem>
                </Select>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Other Categories"
                multiline
                rows={3}
                variant="outlined"
                color="primary"
                size="medium"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="Source">Source</InputLabel>
                <Select
                  labelId="Source"
                  id="Source"
                  value={source}
                  label="Source"
                  onChange={handleSourceChange}
                >
                  <MenuItem value={'URL'}>URL</MenuItem>
                  <MenuItem value={'Book'}>Book</MenuItem>
                  <MenuItem value={'Own Recipe'}>Own Recipe</MenuItem>
                </Select>
              </FormControl>
              <TextField label="Source" variant="outlined">
                Source
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                multiline
                rows={6}
                variant="outlined"
                color="primary"
                size="medium"
                fullWidth
              />
            </Grid>
          </Grid>
        </form>
      </Box>

      <Box
        padding={{ xs: 3, sm: 6 }}
        width={'100%'}
        component={Card}
        borderRadius={2}
        boxShadow={4}
        marginBottom={4}
      >
        <Grid item xs={12}>
          <TextField
            label="Ingredients"
            multiline
            rows={20}
            variant="outlined"
            color="primary"
            size="medium"
            fullWidth
          />
        </Grid>
      </Box>
      <Box
        padding={{ xs: 3, sm: 6 }}
        width={'100%'}
        component={Card}
        borderRadius={2}
        boxShadow={4}
        marginBottom={4}
      >
        <Grid item xs={12}>
          <TextField
            label="Procedures"
            multiline
            rows={20}
            variant="outlined"
            color="primary"
            size="medium"
            fullWidth
          />
        </Grid>
      </Box>
    </Box>
  )
}

export default Form
