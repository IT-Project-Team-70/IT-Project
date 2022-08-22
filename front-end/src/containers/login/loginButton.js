import * as React from 'react'
// import PropTypes from 'prop-types'
import DialogButton from '../../component/dialogButton'
import LoginPanel from './login'

const LoginInButton = () => {
  const [title, setTitle] = React.useState('Login')

  return (
    <DialogButton
      dialogTitle={title}
      buttonText="Login"
      buttonProps={{ variant: 'contained', color: 'secondary' }}
      dialogProps={{ maxWidth: 'lg' }}
      dialogContent={(onClose) => (
        <LoginPanel
          onClose={onClose}
          onChange={(title) => {
            setTitle(title)
          }}
        />
      )}
    />
  )
}
export default LoginInButton
LoginInButton.propTypes = {}
