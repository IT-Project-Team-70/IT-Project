import * as React from 'react'
import DialogButton from '../../component/dialogButton'
// import PropTypes from 'prop-types'
import SignUpPanel from './signup'

export default function SignUpButton() {
  const [title, setTitle] = React.useState('Sign up')
  return (
    <DialogButton
      dialogTitle={title}
      buttonText="Sign up"
      buttonProps={{ variant: 'outlined', sx: { backgroundColor: '#fff' } }}
      dialogProps={{ maxWidth: 'lg' }}
      dialogContent={(onClose) => (
        <SignUpPanel
          onClose={onClose}
          onChange={(title) => {
            setTitle(title)
          }}
        />
      )}
    />
  )
}
SignUpButton.propTypes = {}
