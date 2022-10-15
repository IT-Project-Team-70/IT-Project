import React, { useEffect, useState } from 'react'
// import useMediaQuery from '@mui/material/useMediaQuery'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
// import { useTheme } from '@mui/material'
import RecipeDetail from './recipeDetail'
import Ingredient from './ingredient'
import Procedure from './procedure'
import { ThemeProvider } from '@mui/system'
import useTheme from '../../../../css/muiTheme'
import { useHistory } from 'react-router-dom'
import AlertDialog from '../../../../component/alertDialog'
import callApi from '../../../../api/util/callAPI'
import personalKitchenAPI from '../../../../api/def/personalKitchen'
import AxiosV1 from '../../../../api/axiosV1'
import LoadingSpinner from '../../../../component/loadingSpinner'
import ReportProblemIcon from '@mui/icons-material/ReportProblem'
import { Typography } from '@mui/material'
import { LOGIN } from '../../../../routes/routeConstant'
import PropTypes from 'prop-types'

const EditRecipe = ({ match, ...props }) => {
  const [noneInputData, setNoneInputData] = useState({})
  const [procedureError, setProcedureError] = useState(false)
  const [fileError, setFileError] = useState(false)
  const initialAlertDialogState = {
    open: false,
    message: '',
  }
  const [alertDialog, setAlertDialog] = useState(initialAlertDialogState)
  const [cancelToken] = useState(AxiosV1.CancelToken.source())
  const [personalKitchenDataStatus, setStatus] = useState('initial')
  const [personalKitchenData, setPersonalKitchenData] = useState({})
  const [submitStatus, setSubmitStatus] = useState('initial')
  const [error, setError] = useState({ error: false, message: '' })
  const history = useHistory()
  const [image, setImage] = useState('')
  const [recipeData, setRecipeData] = useState(null)
  const [recipeStatus, setRecipeStatus] = useState('initial')
  const recipeId = match.params.id
  useEffect(() => {
    if (recipeStatus === 'initial') {
      setRecipeStatus('loading')
      callApi({
        apiConfig: personalKitchenAPI.getRecipe(recipeId),
        onStart: () => {},
        onSuccess: (res) => {
          //remove ingredients's _id
          setRecipeData({
            ...res.data.recipe,
            ingredients: res.data.recipe.ingredients.map((ind) => {
              return { name: ind.name, quantity: ind.quantity, unit: ind.unit }
            }),
          })
          setImage(
            URL.createObjectURL(
              new Blob(
                [new Uint8Array(JSON.parse(res.data.recipe.image.data))],
                {
                  type: res.data.recipe.image.type,
                }
              )
            )
          )
          setRecipeStatus('success')
        },
        onError: (err) => {
          setRecipeStatus('error')
          setError({ error: true, errorMessage: err.response.data })
          if (err.response.status === 401) {
            history.push(LOGIN)
          }
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

  useEffect(() => {
    if (personalKitchenDataStatus === 'initial') {
      setStatus('loading')
      callApi({
        apiConfig: personalKitchenAPI.personalKitchen(),
        onStart: () => {},
        onSuccess: (res) => {
          setStatus('success')
          setPersonalKitchenData(res.data)
        },
        onError: (err) => {
          console.log(err)
          setStatus('error')
          setError({ error: true, message: err.response.data })
          if (err.response.status === 401) {
            history.push(LOGIN)
          }
        },
        onFinally: () => {},
      })
    }
    return () => {
      cancelToken.cancel('Request cancel.')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cancelToken, personalKitchenDataStatus])

  const handleSubmit = (event) => {
    event.preventDefault()
    //check if procedure isn't empty
    if (noneInputData.cover) {
      //check if procedure isn't empty
      setFileError(false)
      if (noneInputData.procedure && noneInputData.procedure !== '') {
        setProcedureError(false)
        setSubmitStatus('loading')
        const data = new FormData(event.currentTarget)
        const formDataObj = {}
        data.forEach((value, key) => (formDataObj[key] = value))
        //Ordering data into the required datastruct
        const submitData = {
          title: formDataObj.title,
          source: {
            type: noneInputData.source,
            content:
              noneInputData.source === 'Own'
                ? 'Own'
                : formDataObj.sourceContent,
          },
          tagList: noneInputData.tagList,
          courseList: noneInputData.courseList,
          description: formDataObj.description,
          prepTime: {
            hours: formDataObj.prepTimeHour,
            minutes: formDataObj.prepTimeMinute,
          },
          serveSize: formDataObj.serveSize,
          ingredients: noneInputData.ingredients,
          instructions: noneInputData.procedure,
        }
        let submitFormData = new FormData()

        for (let i = 0; i < Object.keys(submitData).length; i++) {
          submitFormData.set(
            Object.keys(submitData)[i],
            JSON.stringify(submitData[Object.keys(submitData)[i]])
          )
        }
        let newImage
        if (noneInputData.cover[0].file !== image) {
          noneInputData.cover[0].file.arrayBuffer().then((value) => {
            newImage = {
              //store as Unit8array
              data: `[${new Uint8Array(value).toString()}]`,
              type: noneInputData.cover[0].file.type,
            }
            submitFormData.set('image', JSON.stringify(newImage))
            callApi({
              apiConfig: personalKitchenAPI.editRecipe(
                recipeId,
                submitFormData
              ),
              onStart: () => {},
              onSuccess: (res) => {
                console.log('success', res)
                history.push(`/recipe/${res.data._id}`)
              },
              onError: (err) => {
                console.log(err)
                setSubmitStatus('fail')
                setError({ error: true, message: err.response.data })
              },
              onFinally: () => {},
            })
          })
        } else {
          submitFormData.set('image', JSON.stringify(recipeData.image))
          //call api
          callApi({
            apiConfig: personalKitchenAPI.editRecipe(recipeId, submitFormData),
            onStart: () => {},
            onSuccess: (res) => {
              console.log('success', res)
              history.push(`/recipe/${res.data._id}`)
            },
            onError: (err) => {
              console.log(err)
              setSubmitStatus('fail')
              setError({ error: true, message: err.response.data })
            },
            onFinally: () => {},
          })
        }
      } else {
        //procedure is empty
        setProcedureError(true)
      }
    } else {
      //image file is empty
      setFileError(true)
    }

    event.preventDefault()
  }
  const theme = useTheme()
  // const muitheme = useTheme()
  // const isMd = useMediaQuery(muitheme.breakpoints.up('md'), {
  //   defaultMatches: true,
  // })

  return (
    <ThemeProvider theme={theme}>
      <Box height="inherit" sx={{ backgroundColor: '#FFF4CE' }}>
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
          recipeData &&
          recipeStatus === 'success' && (
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
                    Save
                  </Button>
                </Box>
                <Box>
                  <Button
                    variant="text"
                    color="primary"
                    size="medium"
                    onClick={() =>
                      setAlertDialog({
                        open: true,
                        message:
                          'You will be redirect to the previous page. Your change will be gone, do you still wish to proceed?',
                      })
                    }
                  >
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
                    image={image}
                    recipeData={recipeData}
                    onChange={(data) => {
                      setNoneInputData((prev) => ({ ...prev, ...data }))
                    }}
                    fileError={fileError}
                    status={personalKitchenDataStatus}
                    personalKitchenData={personalKitchenData}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} height="inherit">
                  <Ingredient
                    recipeData={recipeData}
                    onChange={(data) => {
                      setNoneInputData((prev) => ({
                        ...prev,
                        ingredients: data,
                      }))
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} height="inherit">
                  <Procedure
                    recipeData={recipeData}
                    onChange={(data) => {
                      setNoneInputData((prev) => ({ ...prev, procedure: data }))
                    }}
                    error={procedureError}
                  />
                </Grid>
              </Grid>
            </Box>
          )
        )}
      </Box>
      <AlertDialog
        open={alertDialog.open}
        onClose={() => {
          setAlertDialog(initialAlertDialogState)
        }}
        onConfirm={() => history.goBack()}
        onCancel={() => {}}
        alertText={alertDialog.message}
      />
      <LoadingSpinner isLoading={submitStatus === 'loading'} />
    </ThemeProvider>
  )
}
EditRecipe.propTypes = {
  match: PropTypes.object,
}

export default EditRecipe
