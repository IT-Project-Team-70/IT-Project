import { Button } from '@mui/material'
import React, { Fragment } from 'react'
import authAPI from '../../../api/def/auth'
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
  return (
    <Fragment>
      <Button onClick={loginWithGoogle}>loginWithGoogle</Button>
    </Fragment>
  )
}

Test2.propTypes = {}

export default Test2
