import React, { useEffect, useState, useContext } from 'react'
import './App.css'
import { RouteItems } from './routes/routeItems'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import AppLayout from './containers/appLayout/index'
import '../src/css/index.scss'
import { Context } from './stores/userStore'
import AxiosV1 from './api/axiosV1'
import callApi from './api/util/callAPI'
import authAPI from './api/def/auth'
import { socketIo } from './socket'

function App() {
  const [cancelToken] = useState(AxiosV1.CancelToken.source())
  const [userContext] = useContext(Context)
  console.log(userContext)
  //check login status
  useEffect(() => {
    AxiosV1.interceptors.response.use(
      function (response) {
        return response
      },
      function (err) {
        if (err.response) {
          if (err.response.status === 401) {
            // console.error(err)
            console.log('no auth')
            //no auth, logout
            userContext.dispatch({ type: 'logoutSuccess' })
          }
        }
        return Promise.reject(err)
      }
    )
    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    callApi({
      apiConfig: authAPI.checkCookie(),
      onStart: () => {},
      onSuccess: (res) => {
        userContext.dispatch({ type: 'loginSuccess', payload: res.data })
      },
      onError: (err) => {},
      onFinally: () => {},
    })
    return () => {
      cancelToken.cancel('Request cancel.')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cancelToken])
  useEffect(() =>{
    if(userContext.userState.login){
      socketIo.socket.emit('addSocket', userContext.userState.userInfo.id, (response)=>{
      })
    }
  }, [userContext.userState])
  return (
    
      <BrowserRouter>
        <Switch
          path={RouteItems.reduce(
            (acc, curr) => (curr.authority ? [...acc, curr.path] : acc),
            []
          )}
          exact={true}
        >
          {RouteItems.map((routeItem) => (
            <Route
              key={routeItem.path}
              path={routeItem.path}
              exact={routeItem.exact}
              render={(routeProps) => (
                <AppLayout>
                  <routeItem.component {...routeProps} />{' '}
                </AppLayout>
              )}
            />
          ))}
          <Route
            render={(routeProps) => (
              <div
                style={{
                  border: '1px solid red',
                  height: '100vh',
                  width: '100vw',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
              >
                Oops! there is no resource here.
              </div>
            )}
          />
        </Switch>
      </BrowserRouter>
    
  )
}

export default App
