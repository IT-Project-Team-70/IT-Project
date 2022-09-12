import { Button } from '@mui/material'
import React, { Fragment } from 'react'
import authAPI from '../../../api/def/auth'
import pkAPI from '../../../api/def/personalKitchen'
import { callApi } from '../../../api/util/callAPI'
const Test2 = (props) => {
  const loginWithGoogle = () => {
    callApi({
      apiConfig: authAPI.loginWithGoogle(),
      onStart: () => {},
      onSuccess: (data) => {
        console.log(data)
      },
      onError: (err) => {},
      onFinally: () => {},
    })
  }
  const testProtectedRoutes = () => { 
    callApi({
      apiConfig: pkAPI.personalKitchen(),
      onStart: () => {},
      onSuccess: (data) => {
        console.log(data)
      },
      onError: (err) => {},
      onFinally: () => {},
    })
  }
  return (
    <Fragment>
      <Button onClick={loginWithGoogle}>loginWithGoogle</Button>
      <Button onClick={testProtectedRoutes}>pkKitchen</Button>
    </Fragment>
  )
}

Test2.propTypes = {}

export default Test2
