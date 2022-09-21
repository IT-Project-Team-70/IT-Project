import React, { useReducer } from 'react'
import { Context, initialState, reducer } from './stores/userStore'
import PropTypes from 'prop-types'
const ReduxProvider = ({ children }) => {
  const [userState, dispatch] = useReducer(reducer, initialState)
  return (
    <Context.Provider value={[{ userState, dispatch }]}>
      {children}
    </Context.Provider>
  )
}
ReduxProvider.propTypes = {
  children: PropTypes.node,
}

export default ReduxProvider
