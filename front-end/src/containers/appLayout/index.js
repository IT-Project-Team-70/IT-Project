import {
  Box,
  Button,
  Divider,
  Stack,
  ThemeProvider,
  Typography,
} from '@mui/material'
import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { RouteItems } from '../../routes/routeItems'
import { useHistory, useLocation } from 'react-router-dom'
import useTheme from '../../css/muiTheme'

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
          height: '8vh',
          justifyContent: 'space-between',
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
                    boxShadow:
                      index !== 0 && pathName === routeItem.path
                        ? '0px -7px 0px 0px #E66B3B inset'
                        : 'none',
                  }}
                >
                  <Button
                    sx={{
                      '&': {
                        textTransform: 'none',
                      },
                    }}
                    onClick={() => history.push(routeItem.path)}
                  >
                    <Typography
                      variant={index === 0 ? 'h6' : 'subtitle1'}
                      sx={{ color: '#E0470B' }}
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
                    borderColor: '#E66B3B',
                    borderRightWidth: '5px',
                    marginTop: '22px',
                    marginBottom: '22px',
                  }}
                />
              </Fragment>
            )
          })}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box>
            <ThemeProvider theme={theme}>
              <Stack direction="row" spacing={1}>
                <Button variant="contained" color="secondary">
                  log in
                </Button>
                <Button variant="outlined" color="primary">
                  Sign up
                </Button>
              </Stack>
            </ThemeProvider>
          </Box>
        </Box>
      </Box>
      <Divider
        sx={{
          borderColor: '#E66B3B',
        }}
      />
      <div className="content">
        <main className="main-content">{children}</main>
      </div>
    </Fragment>
  )
}

AppLayout.propTypes = {
  children: PropTypes.node,
}

export default AppLayout