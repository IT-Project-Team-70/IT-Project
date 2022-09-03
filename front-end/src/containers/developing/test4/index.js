import React from 'react'
import authAPI from '../../../api/def/auth'
import { callApi } from '../../../api/util/callAPI'
const testGoogle = () => {
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
  return <button onClick={loginWithGoogle}>Log in with Google</button>
}
export default testGoogle
