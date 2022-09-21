import React from 'react'
import { Box } from '@mui/system'
import { Typography } from '@mui/material'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import PropTypes from 'prop-types'
import { callApi } from '../../api/util/callAPI'
import authAPI from '../../api/def/auth'
import LoadingSpinner from '../../component/loadingSpinner'
import { ThemeProvider } from '@mui/material/styles'
import useTheme from '../../css/muiTheme'
import LoginPanel from '../login/login'

const ForgotPassword = ({ onChange = () => {}, onClose = () => {} }) => {
  const [isloading, setIsLoading] = React.useState(false)
  const [toPage, setToPage] = React.useState({ toPage: false, to: '' })
  const [error, setError] = React.useState({ error: false, errorMeessage: '' })
  // const [success, setSuccess] = React.useState({
  //   success: false,
  //   successMessage: '',
  // })
  const theme = useTheme()
  const handleonSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    let submitData = {
      email: data.get('email'),
    }
    setIsLoading(true)
    callApi({
      apiConfig: authAPI.forgetPassword(submitData),
      onStart: () => {},
      onSuccess: (res) => {
        //setSuccess({ success: true, successMessage: res.data })
        console.log(res)
      },
      onError: (err) => {
        console.log(err)

        if (err.response.status === 404) {
          setError({ error: true, errorMeessage: err.response.data })
        }
      },
      onFinally: () => {},
    })
    setIsLoading(false)
  }
  const toComponent = () => {
    switch (toPage.to) {
      case 'Login':
        return <LoginPanel onChange={onChange} onClose={onClose} />
      default:
        return <></>
    }
  }

  return toPage.toPage ? (
    toComponent()
  ) : (
    <ThemeProvider theme={theme}>
      <Box
        position={'relative'}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        height="inherit"
      >
        <Box>
          <Box marginBottom={4}>
            <Typography
              sx={{
                textTransform: 'uppercase',
                fontWeight: 'medium',
              }}
              gutterBottom
              color={'textSecondary'}
            >
              Recover account
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
              }}
            >
              Forgot your password?
            </Typography>
            <Typography color="text.secondary">
              Enter your email address below and we will get you back on track.
            </Typography>
          </Box>

          <form onSubmit={handleonSubmit}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <TextField
                  placeholder="Email"
                  label="Enter your email"
                  name={'email'}
                  error={error.error}
                  helperText={error.errorMeessage}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item container xs={12}>
                <Box
                  display="flex"
                  flexDirection={{ xs: 'column', sm: 'row' }}
                  alignItems={{ xs: 'stretched', sm: 'center' }}
                  justifyContent={'space-between'}
                  width={'100%'}
                  maxWidth={600}
                  margin={'0 auto'}
                >
                  <Box marginBottom={{ xs: 1, sm: 0 }}>
                    <Button
                      size={'large'}
                      variant={'outlined'}
                      onClick={() => {
                        onChange('Login')
                        setToPage({ toPage: true, to: 'Login' })
                      }}
                    >
                      Back to login
                    </Button>
                  </Box>
                  <Button
                    size={'large'}
                    variant={'contained'}
                    type={'submit'}
                    color="secondary"
                  >
                    Send reset link
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
        <LoadingSpinner isLoading={isloading} />
      </Box>
    </ThemeProvider>
  )
}

export default ForgotPassword
ForgotPassword.propTypes = { onChange: PropTypes.func, onClose: PropTypes.func }
