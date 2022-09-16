import * as React from 'react'
import Button from '@mui/material/Button'
import authAPI from '../../api/def/auth'
import callApi from '../../api/util/callAPI'
import { Context } from '../../stores/userStore'
const LogoutButton = () => {
  const [userContext] = React.useContext(Context)
  const handleLogoutOnClick = () => {
    callApi({
      apiConfig: authAPI.logout(),
      onStart: () => {},
      onSuccess: (data) => {
        console.log(data)
        userContext.dispatch({ type: 'logoutSuccess' })
      },
      onError: (err) => {
        userContext.dispatch({ type: 'logoutFailure' })
      },
      onFinally: () => {},
    })
  }
  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={() => handleLogoutOnClick()}
    >
      Logout
    </Button>
  )
}
export default LogoutButton
LogoutButton.propTypes = {}
