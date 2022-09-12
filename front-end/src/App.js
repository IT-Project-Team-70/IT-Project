import React, { useReducer } from 'react'
import './App.css'
import { RouteItems } from './routes/routeItems'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import AppLayout from './containers/appLayout/index'
import AxiosV1 from './api/axiosV1'
import '../src/css/index.scss'
import { Context, initialState, reducer } from './stores/userStore'
function App() {
  const [userState, dispatch] = useReducer(reducer, initialState)
  console.log('NODE_ENV', process.env)
  // AxiosV1 setting
  AxiosV1.interceptors.response
    .use
    // function (response) {
    //   return response
    // }
    // function (err) {
    //   // check if http status response
    //   if (err.response) {
    //     if (err.response.status === 401) {
    //       console.error(err)
    //     } else if (err.response.status === 502) {
    //       // setServer502(true)
    //     }
    //   }
    //   return Promise.reject(err)
    // }
    ()

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
