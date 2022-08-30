
import React from 'react'

const testGoogle = ()=>{
  const loginWithGoogle= () => {
    callApi({
      apiConfig: authAPI.login({
        
      }),
      onStart: () => {},
      onSuccess: (data) => {
        console.log(data)
      },
      onError: (err) => {},
      onFinally: () => {},
    })
  }
  return(
    <div>
    <button onClick = {(loginWithGoogle}>Log in with Google</button>
    </div>
  )
 
}
export default testGoogle;