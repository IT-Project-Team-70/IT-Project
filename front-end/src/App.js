import React, { useEffect, useReducer, useState } from 'react'
import './App.css'
import { RouteItems } from './routes/routeItems'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import AppLayout from './containers/appLayout/index'
import '../src/css/index.scss'
import { Context, initialState, reducer } from './stores/userStore'
import personalKitchenAPI from './api/def/personalKitchen'
import AxiosV1 from './api/axiosV1'
import callApi from './api/util/callAPI'
function App() {
  const [userState, dispatch] = useReducer(reducer, initialState)
  const [personalKitchenDataStatus, setStatus] = useState('initial')
  const [cancelToken] = useState(AxiosV1.CancelToken.source())
  //check login status
  useEffect(() => {
    if (personalKitchenDataStatus === 'initial') {
      setStatus('loading')
      callApi({
        apiConfig: personalKitchenAPI.personalKitchen(),
        onStart: () => {},
        onSuccess: (res) => {
          setStatus('success')
        },
        onError: (err) => {
          console.log(err)
          setStatus('error')
        },
        onFinally: () => {},
      })
    }
    return () => {
      cancelToken.cancel('Request cancel.')
    }
  }, [cancelToken, personalKitchenDataStatus])

  return (
    <Context.Provider value={[userState, dispatch]}>
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
    </Context.Provider>
  )
}

export default App
