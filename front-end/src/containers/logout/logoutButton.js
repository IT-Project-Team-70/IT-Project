import * as React from 'react'
import Button from '@mui/material/Button'
import authAPI from '../../api/def/auth'
import callApi from '../../api/util/callAPI'
// import PropTypes from 'prop-types'
import { Context } from '../../stores/userStore'
const LogoutButton = () => {
  const [userState, dispatch] = React.useContext(Context)
  console.log(userState.userInfo)
  const handleLogoutOnClick = () => {
    callApi({
      apiConfig: authAPI.logout(),
      onStart: () => {},
      onSuccess: (data) => {
        console.log(data)
        dispatch({ type: 'logoutSuccess' })
      },
      onError: (err) => {
        dispatch({ type: 'logoutFailure' })
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
