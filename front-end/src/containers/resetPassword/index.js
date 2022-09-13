import * as React from 'react'
import Button from '@mui/material/Button'
import { TextField } from '@mui/material'

export default function resetPassword(){
  const [newP, setNewP] = React.useState('')
  const [confirmedNewP, setConfirmedNewP] = React.useState('')
  const validatePassword = () => {
    let newP = document.getElementById('new_p')
    let confirmedNewP = document.getElementById('confirmed_new_p')
    if (newP.value !== confirmedNewP.value) {
      confirmedNewP.setCustomValidity("Passwords Don't Match")
    } else {
      confirmedNewP.setCustomValidity('')
    }
  }
  const handSubmit= (event)=>{
    event.preventDefault()
    validatePassword()
  }
  return(
    <div>
      <form onSubmit={handleSubmit}>
        <TextField id="new_p" label="New Password" variant="outlined" onChange={(e)=>setNewP(e.target.value)} required/>
        <TextField id="confirmed_new_p" label = "Confirmed New Password" variant="outlined" onChange={(e)=>setConfirmedNewP(e.target.value)} required/>
      </form>
      <Button type="submit" variant="contained" color="secondary">Reset Password & Back To Login</Button>
    </div>
  )
}