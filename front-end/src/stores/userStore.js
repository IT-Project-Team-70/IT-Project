import React from 'react'

export const initialState = {login: false, userInfo:null} 

export const reducer = (state, action) => {
  switch(action.type){
    case "loginFailure": 
      return state
    case "loginSuccess":
      return {login: true, userInfo: action.payload}
    case "logoutSuccess":
      return {login: false, userInfo: null}
    case "logoutFailure":
      return state
    default: 
      return state
  }
}

export const Context = React.createContext(initialState)

