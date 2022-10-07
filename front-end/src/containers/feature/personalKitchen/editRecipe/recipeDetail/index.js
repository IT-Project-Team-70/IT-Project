import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import {
  MenuItem,
  Input,
  Typography,
  ButtonGroup,
  Autocomplete,
} from '@mui/material'
import { useDropzone } from 'react-dropzone'
import UploadFileIcon from '@mui/icons-material/UploadFile'

const RecipeDetail = ({
  onChange = () => {},
  fileError,
  status,
  recipeData,
  image,
  personalKitchenData,
}) => {
  const [files, setFiles] = React.useState([])
  const [tagList, setTagList] = React.useState([])
  const [courseList, setCourseList] = React.useState([])
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
    setSource(recipeData.source.type)
    setFiles([
      {
        file: image,
        preview: image,
      },
    ])
    setTagList(recipeData.categoryNameList)
    setCourseList(recipeData.courseNameList)
    onChange({
      source: recipeData.source.type,
      tagList: recipeData.categoryNameList,
      courseList: recipeData.courseNameList,
      cover: [
        {
          file: image,
          preview: image,
        },
      ],
    })
    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image, recipeData])

  useEffect(() => {
    if (files.length > 0 && files[0].path && files[0].path !== '') {
      onChange({ cover: files })
    }
    onChange({ source: source, tagList: tagList, courseList: courseList })
    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files, source, tagList, courseList])

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
                height: '20vh',
                borderRadius: '10px',
                borderStyle: 'dashed',
                borderColor:
                  fileError &&
                  !(files.length > 0 && files[0].path && files[0].path !== '')
                    ? 'red'
                    : 'rgb(0 0 0 / 10%)',
              }}
            >
              <Input {...getInputProps()} />
              {files.length > 0 ? (
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
                ))
              ) : (
                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  height="inherit"
                >
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    p={2}
                  >
                    <UploadFileIcon color="secondary" />
                    <Typography
                      variant="body1"
                      sx={{
                        display: files.length === 0 ? 'block' : 'none',
                        paddingTop: '16px',
                        paddingLeft: '12px',
                        paddingRight: '12px',
                      }}
                    >
                      {`Drag and drop some files here, or click to select files`}
                    </Typography>
                    {fileError && (
                      <Typography
                        variant="body1"
                        sx={{
                          color: 'red',
                        }}
                      >
                        Please fill in this field
                      </Typography>
                    )}
                  </Box>
                </Box>
              )}
            </Box>
          </Grid>
          <Divider sx={{ marginTop: '8px', marginBottom: '8px' }} />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body1">Recipe Title*</Typography>
              <TextField
                id="title"
                name="title"
                variant="outlined"
                size="medium"
                fullWidth
                required
                defaultValue={recipeData.title}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">Serving Size*</Typography>
              <TextField
                name="serveSize"
                id="serveSize"
                required
                size="medium"
                fullWidth
                type="number"
                defaultValue={recipeData.serveSize}
              />
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
                  id="prepTimeHour"
                  name="prepTimeHour"
                  required
                  size="medium"
                  select
                  fullWidth
                  defaultValue={recipeData.prepTime.hours}
                >
                  <MenuItem value={0}>0</MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4 or more</MenuItem>
                </TextField>
                <Typography
                  sx={{ paddingLeft: '16px', paddingRight: '16px' }}
                  variant="subtitle1"
                >
                  hr
                </Typography>
                <TextField
                  id="prepTimeMinute"
                  name="prepTimeMinute"
                  select
                  fullWidth
                  required
                  defaultValue={recipeData.prepTime.minutes}
                >
                  <MenuItem value={0}>0</MenuItem>
                  <MenuItem value={15}>15</MenuItem>
                  <MenuItem value={30}>30</MenuItem>
                  <MenuItem value={45}>45</MenuItem>
                </TextField>
                <Typography sx={{ paddingLeft: '16px' }} variant="subtitle1">
                  min
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">Courses</Typography>
              {status === 'error' && (
                <Typography sx={{ color: 'red' }} variant="body2">
                  Oops! There is something wrong
                </Typography>
              )}
              <Autocomplete
                multiple
                defaultValue={recipeData.courseNameList}
                loading={false}
                options={
                  status === 'success'
                    ? personalKitchenData.courses.map((tag) => tag.name)
                    : []
                }
                onChange={(e, value, reason) => {
                  setCourseList(value)
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    placeholder="add more..."
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">Other Categories</Typography>
              <Autocomplete
                multiple
                defaultValue={recipeData.categoryNameList}
                freeSolo
                loading={false}
                options={
                  status === 'success'
                    ? personalKitchenData.tags.map((tag) => tag.name)
                    : []
                }
                onChange={(e, value, reason) => {
                  setTagList(value)
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    placeholder="add more..."
                  />
                )}
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
            <Grid
              item
              xs={12}
              sx={
                source === 'URL' || source === 'Book'
                  ? {}
                  : {
                      opacity: '0',
                      height: '0px',
                      marginTop: '-72px',
                      zIndex: '-1',
                    }
              }
            >
              <TextField
                id="sourceContent"
                name="sourceContent"
                variant="outlined"
                size="medium"
                fullWidth
                required
                defaultValue={recipeData.source.content}
                placeholder={
                  source === 'URL'
                    ? 'URL'
                    : source === 'Book'
                    ? 'Book Title'
                    : ''
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">Description</Typography>
              <TextField
                id="description"
                name="description"
                multiline
                rows={6}
                required
                placeholder="Tell us more: allergens, descriptions, tastes, etc."
                variant="outlined"
                color="primary"
                size="medium"
                fullWidth
                defaultValue={recipeData.description}
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
  fileError: PropTypes.bool,
  status: PropTypes.string,
  personalKitchenData: PropTypes.object,
  recipeData: PropTypes.object,
  image: PropTypes.any,
}
