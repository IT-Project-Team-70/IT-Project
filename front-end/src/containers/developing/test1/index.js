import { Button } from '@mui/material'
import React, { Fragment } from 'react'
import authAPI from '../../../api/def/auth'
import { callApi } from '../../../api/util/callAPI'
import LoadingSpinner from '../../../component/loadingSpinner'
import { Context } from '../../../stores/userStore'

const Test1 = (props) => {
  const [userState, dispatch] = React.useContext(Context)
  const handleLoginOnClick = () => {
    callApi({
      apiConfig: authAPI.login({
        password: '00000000',
        username: 'user01',
      }),
      onStart: () => {},
      onSuccess: (data) => {
        console.log(data)
      },
      onError: (err) => {},
      onFinally: () => {},
    })
  }
  const handleLogoutOnClick = () => {
    callApi({
      apiConfig: authAPI.logout(),
      onStart: () => {},
      onSuccess: (data) => {
        console.log(data)
        dispatch({type: "logoutSuccess"})
      },
      onError: (err) => {
        dispatch({type: "logoutFailure"})
      },
      onFinally: () => {},
    })
  }
  return (
    <Fragment>
      <Button onClick={handleLoginOnClick}>login</Button>
      <Button onClick={handleLogoutOnClick}>logout</Button>
      <LoadingSpinner />
    </Fragment>
  )
}

Test1.propTypes = {}

export default Test1
