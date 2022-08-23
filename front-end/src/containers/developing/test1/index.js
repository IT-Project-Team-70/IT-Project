import { Button } from '@mui/material'
import React from 'react'
import authAPI from '../../../api/def/auth'
import { callApi } from '../../../api/util/callAPI'

const Test1 = (props) => {
  const handleOnClick = () => {
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
  return <Button onClick={handleOnClick}>test</Button>
}

Test1.propTypes = {}

export default Test1
