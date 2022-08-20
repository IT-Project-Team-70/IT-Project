import { Box, Button, Divider, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { RouteItems } from '../../routes/routeItems'
import { useHistory } from 'react-router-dom'

const AppLayout = (props) => {
  const { children = <></> } = props
  const history = useHistory()
  return (
    <Fragment>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        {RouteItems.map((routeItem, index) => {
          return (
            <Fragment key={routeItem.name}>
              <Box
                sx={{
                  display: 'flex',
                  padding: index === 0 ? '12px' : '8px',
                  flexGrow: 0,
                  flexShrink: 1,
                  maxWidth: index === 0 ? '150px' : '100px',
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
                  borderRightWidth: '4px',
                  marginTop: '22px',
                  marginBottom: '22px',
                }}
              />
            </Fragment>
          )
        })}
      </Box>
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
