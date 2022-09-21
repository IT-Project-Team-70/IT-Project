import {
  Box,
  Divider,
  ThemeProvider,
  Typography,
  Grid,
  Paper,
  Chip,
} from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import AxiosV1 from '../../../api/axiosV1'
import personalKitchenAPI from '../../../api/def/personalKitchen'
import { callApi } from '../../../api/util/callAPI'
import HtmlEditor from '../../../component/htmlEditor'
import useTheme from '../../../css/muiTheme'
import PropTypes from 'prop-types'

const ViewRecipe = ({ match, ...props }) => {
  const [image, setImage] = useState('')
  const [recipeData, setRecipeData] = useState(null)
  const [recipeStatus, setRecipeStatus] = useState('initial')
  const [cancelToken] = useState(AxiosV1.CancelToken.source())
  const recipeId = match.params.id
  useEffect(() => {
    if (recipeStatus === 'initial') {
      setRecipeStatus('loading')
      callApi({
        apiConfig: personalKitchenAPI.getRecipe(recipeId),
        onStart: () => {},
        onSuccess: (res) => {
          setRecipeData(res.data)
          setImage(
            URL.createObjectURL(
              new Blob([new Uint8Array(JSON.parse(res.data.image.data))], {
                type: 'image/png',
              })
            )
          )
          setRecipeStatus('success')
        },
        onError: (err) => {
          setRecipeStatus('error')
          console.log(err)
        },
        onFinally: () => {},
      })
    }
    return () => {
      cancelToken.cancel('Request cancel.')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cancelToken])
  const theme = useTheme()

  return (
    <Fragment>
      <Box
        height="inherit"
        sx={{
          backgroundColor: '#FBEEDB',
        }}
      >
        <ThemeProvider theme={theme}>
          {recipeStatus === 'success' && (
            <Box sx={{ overflowY: 'auto', height: 'inherit' }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Box
                  p={4}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '75%',
                  }}
                >
                  <Box
                    p={3}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      width: '100%',
                    }}
                  >
                    <Box
                      sx={{
                        '&::after': {
                          content: '""',
                          display: 'block',
                        },
                      }}
                    >
                      <Box
                        sx={{
                          position: 'inherit',
                          objectFit: 'cover',
                          width: '100vw',
                          maxHeight: '35vh',
                          maxWidth: '35vh',
                          height: '100vh',
                        }}
                        component="img"
                        alt="uploaded image"
                        src={image}
                      />
                    </Box>
                    <Box
                      component={Paper}
                      sx={{
                        backgroundColor: '#93693d',
                        borderRadius: '24px',
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '16px',
                        marginLeft: '8px',
                        flexGrow: '1',
                      }}
                    >
                      <Typography
                        variant="h4"
                        sx={{
                          padding: '20px',
                          textAlign: 'center',
                          color: '#fbeedb',
                        }}
                      >
                        {recipeData.title.toUpperCase()}
                      </Typography>
                      <Divider
                        sx={{
                          alignSelf: 'center',
                          width: '100%',
                          marginBottom: '8px',
                          borderBottomWidth: '1px',
                          borderColor: '#fbeedb',
                        }}
                      />
                      <Box width="50%" alignSelf="center" paddingTop="36px">
                        {recipeData && (
                          <Typography
                            variant="body1"
                            sx={{ color: '#fbeedb', textAlign: 'center' }}
                          >
                            {recipeData.description.toUpperCase()}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '100%',
                    }}
                  >
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="flex-start"
                      p={3}
                      component={Paper}
                      sx={{
                        backgroundColor: '#fcfcfc',
                        width: '100%',
                        alignSelf: 'center',
                      }}
                    >
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        {recipeData && (
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              width: '100%',
                            }}
                          >
                            <Typography variant="subtitle1">
                              Serve Size
                            </Typography>
                            <Typography variant="h6">
                              {recipeData.serveSize.toString()}
                            </Typography>
                          </Box>
                        )}
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        {recipeData && recipeData.prepTime && (
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              width: '100%',
                            }}
                          >
                            <Typography variant="subtitle1">
                              Preparation Time
                            </Typography>
                            <Box
                              sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                width: '100%',
                                justifyContent: 'center',
                                alignItems: 'flex-end',
                              }}
                            >
                              {recipeData.prepTime.hours !== 0 && (
                                <Fragment>
                                  <Typography variant="h6">
                                    {recipeData.prepTime.hours.toString()}
                                  </Typography>
                                  <Typography variant="body1">
                                    &nbsp;hours&nbsp;
                                  </Typography>
                                </Fragment>
                              )}
                              <Typography variant="h6">
                                {recipeData.prepTime.minutes}
                              </Typography>
                              <Typography variant="body1">
                                &nbsp;minutes
                              </Typography>
                            </Box>
                          </Box>
                        )}
                      </Grid>
                    </Grid>
                    <Box
                      component={Paper}
                      p={3}
                      sx={{
                        backgroundColor: '#fcfcfc',
                        marginTop: '8px',
                        alignSelf: 'center',
                        width: 'calc(100% - 48px)',
                      }}
                    >
                      <Typography variant="h6" sx={{ paddingBottom: '8px' }}>
                        Ingredients
                      </Typography>
                      {recipeData &&
                        recipeData.ingredients.map((ingred) => (
                          <Typography key={ingred._id} variant="body1">
                            {ingred.quantity}&nbsp;{ingred.unit}&nbsp;
                            {ingred.name}
                            &nbsp;
                          </Typography>
                        ))}
                    </Box>
                    <Box
                      component={Paper}
                      p={3}
                      sx={{
                        backgroundColor: '#fcfcfc',
                        marginTop: '8px',
                        alignSelf: 'center',
                        width: 'calc(100% - 48px)',
                      }}
                    >
                      <Typography variant="h6" sx={{ paddingBottom: '8px' }}>
                        Category
                      </Typography>
                      {recipeData && recipeData.courseList && (
                        <Box>
                          <Typography
                            variant="body1"
                            sx={{ paddingBottom: '8px' }}
                          >
                            Course:
                          </Typography>
                          {recipeData.courseList.map((course, index) => (
                            <Chip
                              key={course}
                              label={course}
                              sx={{ marginLeft: '8px' }}
                            ></Chip>
                          ))}
                        </Box>
                      )}
                      {recipeData && recipeData.tagList && (
                        <Box>
                          <Typography variant="body1">Categories:</Typography>
                          {recipeData.tagList.map((tag, index) => (
                            <Chip
                              key={tag}
                              label={tag}
                              sx={{ marginLeft: '8px' }}
                            ></Chip>
                          ))}
                        </Box>
                      )}
                    </Box>
                  </Box>
                  <Box
                    component={Paper}
                    p={3}
                    sx={{
                      backgroundColor: '#fcfcfc',
                      marginTop: '8px',
                      alignSelf: 'center',
                      width: 'calc(100% - 48px)',
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ paddingBottom: '8px', paddingLeft: '24px' }}
                    >
                      Procedures
                    </Typography>
                    {recipeData && (
                      <HtmlEditor
                        readOnly={true}
                        value={recipeData.instructions}
                        config={{
                          allowResizeX: false,
                          allowResizeY: false,
                        }}
                      />
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
        </ThemeProvider>
      </Box>
    </Fragment>
  )
}

ViewRecipe.propTypes = {
  match: PropTypes.object,
}

export default ViewRecipe
