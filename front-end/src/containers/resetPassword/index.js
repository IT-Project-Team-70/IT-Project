import * as React from 'react'
import Button from '@mui/material/Button'
import { TextField, Typography } from '@mui/material'
import { ThemeProvider } from '@mui/system'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import GppBadIcon from '@mui/icons-material/GppBad'
import { useParams } from 'react-router-dom'
import { callApi } from '../../api/util/callAPI'
import authAPI from '../../api/def/auth'
import useTheme from '../../css/muiTheme'
import { styled } from '@mui/material/styles'
import AppLayout from '../appLayout'
import Noti from './noti'
const BoxShadowDiv = styled('div')(
  ({ theme }) => `
  box-shadow: ${theme.shadows[12]};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 20px;
  padding: 20px 30px 40px 30px;
`
)
export default function ResetPassword(props) {
  const [newP, setNewP] = React.useState('')
  const [resetSuccess, setSuccess] = React.useState(false)
  const [tokenExpired, setTokenExpired] = React.useState(false)
  const theme = useTheme()
  const { userId } = useParams()

  React.useEffect(() => {
    const url = window.location.href
    if (url.includes('failure')) {
      setTokenExpired(true)
    }
    return () => {}
  }, [])
  const validatePassword = () => {
    let newP = document.getElementById('new_p')
    let confirmedNewP = document.getElementById('confirmed_new_p')
    if (newP.value !== confirmedNewP.value) {
      confirmedNewP.setCustomValidity("Passwords Don't Match")
    } else {
      confirmedNewP.setCustomValidity('')
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    validatePassword()
    const data = {
      newPassword: newP,
      userId: userId,
    }
    callApi({
      apiConfig: authAPI.resetPassword(data),
      onStart: () => {},
      onSuccess: (res) => {
        console.log(res)
        setSuccess(true)
      },
      onError: (err) => {
        console.log(err)
      },
    })
  }
  return (
    <div style={{ backgroundColor: '#FFF4CE' }}>
      <AppLayout />
      <ThemeProvider theme={theme}>
        {!tokenExpired ? (
          !resetSuccess ? (
            <form
              onSubmit={(e) => handleSubmit(e)}
              style={{
                display: 'flex',
                height: '50%',
                position: 'absolute',
                top: '100px',
                left: '40%',
                backgroundColor: 'white',
              }}
            >
              <BoxShadowDiv>
                <Typography
                  variant="h4"
                  color="text.primary"
                  style={{ marginBottom: '10px' }}
                >
                  Reset Your Password
                </Typography>
                <TextField
                  fullWidth
                  id="new_p"
                  type="password"
                  label="New Password"
                  variant="outlined"
                  onChange={(e) => setNewP(e.target.value)}
                  required
                />
                <TextField
                  fullWidth
                  id="confirmed_new_p"
                  type="password"
                  label="Confirmed New Password"
                  variant="outlined"
                  // onChange={(e) => setConfirmedNewP(e.target.value)}
                  required
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  style={{ marginTop: '20px' }}
                >
                  Reset Password
                </Button>
              </BoxShadowDiv>
            </form>
          ) : (
            <Noti
              message="Password Changed"
              icon={CheckCircleOutlineIcon}
              iconColour="success"
            />
          )
        ) : (
          <Noti
            message="Your session has expired. Please try again."
            icon={GppBadIcon}
            iconColour="error"
          />
        )}
      </ThemeProvider>
    </div>
  )
}
