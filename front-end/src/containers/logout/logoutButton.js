import * as React from 'react'
import { useHistory } from 'react-router-dom'
import Button from '@mui/material/Button'
import authAPI from '../../api/def/auth'
import callApi from '../../api/util/callAPI'
import { Context } from '../../stores/userStore'
import { socketIo } from '../../socket'
const LogoutButton = () => {
  const [userContext] = React.useContext(Context)
  const history = useHistory()
  const handleLogoutOnClick = () => {
    callApi({
      apiConfig: authAPI.logout(),
      onStart: () => {},
      onSuccess: (data) => {
        userContext.dispatch({ type: 'logoutSuccess' })
        socketIo.socket.disconnect()
        history.push('/')
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
