import { Box, CircularProgress } from '@mui/material'
import React from 'react'
import PropTypes from 'prop-types'

/**
 * add position:'relative' in it's parent element to use this
 *
 */
const LoadingSpinner = ({
  isLoading = false,
  BoxProps = {},
  loadingProps = {},
}) => {
  return (
    <Box
      sx={{
        display: isLoading ? 'block' : 'none',
        position: 'absolute',
        zIndex: '999',
        left: '0',
        top: '0',
        // top: '61px',
        width: '100%',
        height: '100%',
        // height: 'calc(100% - 61px)',
        overflow: 'auto',
        // backgroundColor: ' rgb(0, 0, 0)',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
      }}
      {...BoxProps}
    >
      <Box
        className="loadingWrapper"
        sx={{
          display: 'flex',
          width: 'inherit',
          height: 'inherit',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box>
          <CircularProgress {...loadingProps} />
        </Box>
      </Box>
    </Box>
  )
}

LoadingSpinner.propTypes = {
  isLoading: PropTypes.bool,
  BoxProps: PropTypes.object,
  loadingProps: PropTypes.object,
}

export default LoadingSpinner
