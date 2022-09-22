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

const UploadRecipe = () => {
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
        },
        onFinally: () => {},
      })
    }
    return () => {
      cancelToken.cancel('Request cancel.')
    }
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
        let image
        noneInputData.cover[0].file.arrayBuffer().then((value) => {
          image = {
            //store as Unit8array
            data: `[${new Uint8Array(value).toString()}]`,
            type: noneInputData.cover[0].file.type,
          }
          submitFormData.set('image', JSON.stringify(image))
          callApi({
            apiConfig: personalKitchenAPI.newRecipe(submitFormData),
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
                <Button
                  variant="text"
                  color="primary"
                  size="medium"
                  onClick={() =>
                    setAlertDialog({
                      open: true,
                      message:
                        'You will be redirect to the previous page. Your change will be gone, do you still wich to proceed?',
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
                  onChange={(data) => {
                    setNoneInputData((prev) => ({ ...prev, ingredients: data }))
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} height="inherit">
                <Procedure
                  onChange={(data) => {
                    console.log(data)
                    setNoneInputData((prev) => ({ ...prev, procedure: data }))
                  }}
                  error={procedureError}
                />
              </Grid>
            </Grid>
          </Box>
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

export default UploadRecipe
