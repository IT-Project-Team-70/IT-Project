import { Box, Button, Divider, ThemeProvider, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { RouteItems } from '../../routes/routeItems'
import useTheme from '../../css/muiTheme'
import LoginInButton from '../login/loginButton'
import SignUpButton from '../signUp/signupButton'

const AppLayout = (props) => {
  const { children = <></> } = props
  const history = useHistory()
  const pathName = useLocation().pathname
  const theme = useTheme()
  return (
    <Fragment>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          height: '60px',
          justifyContent: 'space-between',
          backgroundColor: '#E0470B',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          {RouteItems.map((routeItem, index) => {
            return (
              <Fragment key={routeItem.name}>
                <Box
                  sx={{
                    display: 'flex',
                    paddingLeft: index === 0 ? '12px' : '8px',
                    paddingRight: index === 0 ? '12px' : '8px',
                    flexGrow: 0,
                    flexShrink: 1,
                    maxWidth: index === 0 ? '150px' : '100px',
                    minWidth: index === 0 ? '150px' : '0px',
                    // boxShadow:
                    //   index !== 0 && pathName === routeItem.path
                    //     ? '0px -5px 0px 0px #fff inset'
                    //     : 'none',
                  }}
                >
                  <Button
                    sx={{
                      '&': {
                        textTransform: 'none',
                      },
                      '&.MuiButton-root:hover': {
                        backgroundColor: '#E66B3B',
                      },
                      backgroundColor:
                        index !== 0 && pathName === routeItem.path
                          ? '#fff'
                          : 'transparent',
                    }}
                    onClick={() => history.push(routeItem.path)}
                  >
                    <Typography
                      variant={index === 0 ? 'h6' : 'subtitle1'}
                      sx={{
                        color:
                          index !== 0 && pathName === routeItem.path
                            ? '#E0470B'
                            : '#fff',
                        '&:hover': {
                          color: '#fff',
                        },
                      }}
                    >
                      {routeItem.name}
                    </Typography>
                  </Button>
                </Box>
                <Divider
                  orientation="vertical"
                  variant="middle"
                  flexItem
                  sx={{
                    borderColor: '#fff',
                    borderRightWidth: '1px',
                    marginTop: '7px',
                    marginBottom: '7px',
                  }}
                />
              </Fragment>
            )
          })}
        </Box>
        <Box
          sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
        >
          <ThemeProvider theme={theme}>
            <Box sx={{ paddingRight: '8px' }}>
              <LoginInButton />
            </Box>
            <Box sx={{ paddingRight: '8px' }}>
              <SignUpButton />
            </Box>
          </ThemeProvider>
        </Box>
      </Box>
      <Divider
        sx={{
          borderColor: '#E66B3B',
        }}
      />
      <div className="content" style={{ height: 'calc(100vh - 61px)' }}>
        <div
          className="main-content"
          style={{
            height: 'inherit',
          }}
        >
          {children}
        </div>
      </div>
    </Fragment>
  )
}

AppLayout.propTypes = {
  children: PropTypes.node,
}

export default AppLayout
