import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import { ThemeProvider } from '@mui/material/styles'
import PropTypes from 'prop-types'
import LoginPanel from '../login/login'
import useTheme from '../../css/muiTheme'
import LoadingSpinner from '../../component/loadingSpinner'
import { callApi } from '../../api/util/callAPI'
import authAPI from '../../api/def/auth'
import { Fragment } from 'react'
import Paper from '@mui/material/Paper'
import CookImage from './cook.png'
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined'
import { Context } from '../../stores/userStore'

export default function SignUpPanel({
  onChange = () => {},
  onClose = () => {},
}) {
  const [toPage, setToPage] = React.useState({ toPage: false, to: '' })
  const [isloading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState({ error: false, errorMessage: '' })
  const [success, setSuccess] = React.useState({
    success: false,
    successMessage: '',
  })
  const [userContext] = React.useContext(Context)
  const theme = useTheme()
  const validatePassword = () => {
    let password = document.getElementById('password')
    let confirm_password = document.getElementById('confirm_password')
    if (password.value !== confirm_password.value) {
      confirm_password.setCustomValidity("Passwords Don't Match")
    } else {
      confirm_password.setCustomValidity('')
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    validatePassword()
    const data = new FormData(event.currentTarget)
    handleSignUpOnClick({
      username: data.get('username'),
      password: data.get('password'),
      email: data.get('email'),
    })
  }
  const handleSignUpOnClick = (data) => {
    setIsLoading(true)
    callApi({
      apiConfig: authAPI.register(data),
      onStart: () => {},
      onSuccess: (res) => {
        setSuccess({ success: true, successMessage: res.data })
        userContext.dispatch({ type: 'loginSuccess', payload: res.data })
        console.log(res)
      },
      onError: (err) => {
        console.log(err)
        if (err.response.status === 500) {
          setError({ error: true, errorMeessage: err.response.data })
        }
        if (err.response.status === 403) {
          setError({ error: true, errorMessage: err.response.data })
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
      <Grid container height="inherit">
        <Grid
          item
          xs={false}
          sm={4}
          md={8}
          lg={8}
          sx={{
            width: '100vw',
            backgroundImage: `url(${CookImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'start',
          }}
        />
        <Grid item xs={12} sm={8} md={4} lg={4} component={Paper} elevation={6}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              {success.success ? (
                <LockOpenOutlinedIcon />
              ) : (
                <LockOutlinedIcon />
              )}
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up {success.success ? 'Success' : error.error ? 'Error' : ''}
            </Typography>
            {success.success ? (
              <Fragment>
                <Typography variant="body" sx={{ textAlign: 'center' }}>
                  {success.successMessage}
                </Typography>
                <Box padding={8} paddingTop={12}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => onClose()}
                  >
                    close
                  </Button>
                </Box>
              </Fragment>
            ) : (
              <Fragment>
                <Typography
                  variant="body"
                  color="primary"
                  sx={{ textAlign: 'center' }}
                >
                  {error.errorMessage}
                </Typography>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  sx={{
                    mt: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <TextField
                    margin="normal"
                    required
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  <TextField
                    margin="normal"
                    required
                    id="confirm_password"
                    name="confirm_password"
                    label="Confirm Password"
                    onChange={() => {
                      validatePassword()
                    }}
                    type="password"
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign Up
                  </Button>
                </Box>

                <Grid container flexDirection="column">
                  <Grid item>
                    <Link
                      onClick={() => {
                        onChange('Login')
                        setToPage({ toPage: true, to: 'Login' })
                      }}
                      variant="body2"
                    >
                      Already have an account? Login
                    </Link>
                  </Grid>
                </Grid>
              </Fragment>
            )}
          </Box>
          <LoadingSpinner isLoading={isloading} />
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}
SignUpPanel.propTypes = { onChange: PropTypes.func, onClose: PropTypes.func }
