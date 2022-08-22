import React from 'react'
import LoginPanel from '../../login/login'
import LoginInButton from '../../login/loginButton'

const Test1 = (props) => {
  return (
    <LoginInButton>
      <LoginPanel />
    </LoginInButton>
  )
}

Test1.propTypes = {}

export default Test1
