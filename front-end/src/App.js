import React from 'react'
import './App.css'
import { RouteItems } from './routes/routeItems'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import AppLayout from './containers/appLayout/index'

function App() {
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
