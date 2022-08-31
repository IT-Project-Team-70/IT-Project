import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import { MenuItem, Input, Typography, ButtonGroup } from '@mui/material'
import { useDropzone } from 'react-dropzone'

const RecipeDetail = ({ onChange = () => {} }) => {
  const [files, setFiles] = React.useState([])
  const [source, setSource] = React.useState('')

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) => {
          return {
            ...file,
            preview: URL.createObjectURL(file),
            file: file,
          }
        })
      )
    },
  })

  useEffect(() => {
    if (files.length > 0 && files[0].path && files[0].path !== '') {
      onChange({ cover: files, source: source })
    } else {
      onChange({ source: source })
    }
    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files, source])

  return (
    <Fragment>
      <Grid item>
        <Typography variant="h5" sx={{ paddingLeft: '8px' }}>
          Recipe Details
        </Typography>
      </Grid>
      <Grid item height="100%" sx={{ overflowY: 'auto' }}>
        <Box
          padding={3}
          component={Card}
          borderRadius={2}
          boxShadow={4}
          margin={1}
        >
          <Grid item xs={12}>
            <Typography variant="body1">Cover Image*</Typography>
            <Box
              {...getRootProps({ className: 'dropzone' })}
              sx={{
                height: '15vh',
                borderRadius: '10px',
                borderStyle: 'dashed',
                borderColor: 'rgb(0 0 0 / 23%)',
              }}
            >
              <Input {...getInputProps()} />
              <Typography
                variant="body1"
                sx={{
                  display: files.length === 0 ? 'block' : 'none',
                }}
              >
                {`Drag 'n' drop some files here, or click to select files`}
              </Typography>
              {files.length > 0 &&
                files.map((file, index) => (
                  <Fragment key={index}>
                    <Box
                      display="flex"
                      justifyContent="center"
                      flexDirection="row"
                      height="calc(100% - 28px)"
                    >
                      <Box
                        sx={{
                          display: files.length > 0 ? 'block' : 'none',
                          objectFit: 'cover',
                        }}
                        component="img"
                        alt="uploaded image"
                        src={file.preview}
                      />
                    </Box>
                    <Typography variant="subtitle1">{file.path}</Typography>
                  </Fragment>
                ))}
            </Box>
          </Grid>
          <Divider sx={{ marginTop: '8px', marginBottom: '8px' }} />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body1">Recipe Title*</Typography>
              <TextField
                id="recipeTitle"
                name="recipeTitle"
                variant="outlined"
                size="medium"
                fullWidth
                //   required
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">Serving Size*</Typography>
              <TextField
                name="servingSize"
                id="servingSize"
                //   required
                size="medium"
                fullWidth
                select
                defaultValue={'1-2'}
              >
                <MenuItem value={'1-2'}>1-2</MenuItem>
                <MenuItem value={'3-4'}>3-4</MenuItem>
                <MenuItem value={'5-6'}>5-6</MenuItem>
                <MenuItem value={'7-8'}>7-8</MenuItem>
                <MenuItem value={'8 and more'}>8 or more</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">Prepare Time*</Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'end',
                }}
              >
                <TextField
                  id="PrepareTimeHour"
                  name="PrepareTimeHour"
                  //   required
                  size="medium"
                  select
                  fullWidth
                  defaultValue={'0'}
                >
                  <MenuItem value={'0'}>0</MenuItem>
                  <MenuItem value={'1'}>1</MenuItem>
                  <MenuItem value={'2'}>2</MenuItem>
                  <MenuItem value={'3'}>3</MenuItem>
                  <MenuItem value={'4'}>4 or more</MenuItem>
                </TextField>
                <Typography
                  sx={{ paddingLeft: '16px', paddingRight: '16px' }}
                  variant="subtitle1"
                >
                  hr
                </Typography>
                <TextField
                  id="PrepareTimeMinute"
                  name="PrepareTimeMinute"
                  select
                  fullWidth
                  //   required
                  defaultValue={'0'}
                >
                  <MenuItem value={'0'}>0</MenuItem>
                  <MenuItem value={'15'}>15</MenuItem>
                  <MenuItem value={'30'}>30</MenuItem>
                  <MenuItem value={'45'}>45</MenuItem>
                </TextField>
                <Typography sx={{ paddingLeft: '16px' }} variant="subtitle1">
                  min
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">Courses*</Typography>
              <TextField
                id="Courses"
                name="Courses"
                fullWidth
                select
                defaultValue={'breakfast'}
                //   required
              >
                <MenuItem value={'breakfast'}>Breakfast</MenuItem>
                <MenuItem value={'lunch'}>Lunch</MenuItem>
                <MenuItem value={'dinner'}>Dinner</MenuItem>
                <MenuItem value={'desert'}>Desert</MenuItem>
                <MenuItem value={'drinks'}>Drinks</MenuItem>
                <MenuItem value={'snacks'}>Snacks</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">Other Categories</Typography>
              <TextField
                fullWidth
                // multiline
                // rows={3}
                variant="outlined"
                color="primary"
                size="medium"
              />
            </Grid>
            <Grid item xs={12}>
              <ButtonGroup
                variant="outlined"
                aria-label="outlined button group"
              >
                <Button
                  variant={source === 'URL' ? 'contained' : 'outlined'}
                  onClick={() => {
                    setSource('URL')
                  }}
                >
                  URL
                </Button>
                <Button
                  variant={source === 'Book' ? 'contained' : 'outlined'}
                  onClick={() => {
                    setSource('Book')
                  }}
                >
                  Book
                </Button>
                <Button
                  variant={source === 'Own' ? 'contained' : 'outlined'}
                  onClick={() => {
                    setSource('Own')
                  }}
                >
                  Own
                </Button>
              </ButtonGroup>
            </Grid>
            {(source === 'URL' || source === 'Book') && (
              <Grid item xs={12}>
                <TextField
                  id="sourceTitle"
                  name="sourceTitle"
                  variant="outlined"
                  size="medium"
                  fullWidth
                  //   required
                  placeholder={
                    source === 'URL'
                      ? 'URL'
                      : source === 'Book'
                      ? 'Book Title'
                      : ''
                  }
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <Typography variant="body1">Description</Typography>
              <TextField
                id="description"
                name="description"
                multiline
                rows={6}
                //   required
                variant="outlined"
                color="primary"
                size="medium"
                fullWidth
              />
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Fragment>
  )
}

export default RecipeDetail
RecipeDetail.propTypes = {
  /**for none input fields */
  onChange: PropTypes.func,
}
