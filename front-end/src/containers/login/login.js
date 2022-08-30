import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import { ThemeProvider } from '@mui/material/styles'
import CookImage from './cook.png'
import useTheme from '../../css/muiTheme'
import SignUpPanel from '../signUp/signup'
import PropTypes from 'prop-types'
import { callApi } from '../../api/util/callAPI'
import authAPI from '../../api/def/auth'
import LoadingSpinner from '../../component/loadingSpinner'
import { Fragment } from 'react'
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined'
import ForgotPassword from '../forgotPassword'

export default function LoginPanel({
  onChange = () => {},
  onClose = () => {},
}) {
  const [toPage, setToPage] = React.useState({ toPage: false, to: '' })
  const [isloading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState({ error: false, errorMeessage: '' })
  const [success, setSuccess] = React.useState({
    success: false,
    successMessage: '',
  })
  const theme = useTheme()
  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    handleLoginOnClick({
      username: data.get('username'),
      password: data.get('password'),
    })
  }
  const handleLoginOnClick = (data) => {
    setIsLoading(true)
    callApi({
      apiConfig: authAPI.login(data),
      onStart: () => {},
      onSuccess: (res) => {
        setSuccess({ success: true, successMessage: res.data })
        console.log(res)
      },
      onError: (err) => {
        console.log(err)

        if (err.response.status === 401) {
          setError({ error: true, errorMeessage: err.response.data })
        }
      },
      onFinally: () => {},
    })
    setIsLoading(false)
  }
  const toComponent = () => {
    switch (toPage.to) {
      case 'Sign up':
        return <SignUpPanel onChange={onChange} onClose={onClose} />
      case 'Forget Password':
        return <ForgotPassword onChange={onChange} onClose={onClose} />
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
              Login {success.success ? 'Success' : error.error ? 'Error' : ''}
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
                  {error.errorMeessage}
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
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    login
                  </Button>
                </Box>

                <Grid container flexDirection="column">
                  <Grid item>
                    <Link
                      onClick={() => {
                        onChange('Forget Password')
                        setToPage({ toPage: true, to: 'Forget Password' })
                      }}
                      variant="body2"
                    >
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link
                      onClick={() => {
                        onChange('Sign up')
                        setToPage({ toPage: true, to: 'Sign up' })
                      }}
                      variant="body2"
                    >
                      {"Don't have an account? Sign Up"}
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

LoginPanel.propTypes = { onChange: PropTypes.func, onClose: PropTypes.func }
