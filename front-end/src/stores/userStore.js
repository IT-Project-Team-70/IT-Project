import React from 'react'

export const initialState = { login: false, userInfo: null }

export const reducer = (state, action) => {
  switch (action.type) {
    case 'loginFailure':
      return state
    case 'loginSuccess':
      return { login: true, userInfo: action.payload }
    case 'logoutSuccess':
      return { login: false, userInfo: null }
    case 'logoutFailure':
      return state
    case 'addNoti':
      return {login: true, userInfo: action.payload}
    case 'readNoti':
      return { login: true, userInfo: action.payload}
    default:
      return state
  }
}

export const Context = React.createContext(initialState)
