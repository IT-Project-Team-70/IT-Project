import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { Typography } from '@mui/material'
import HtmlEditor from '../../../../../component/htmlEditor'

const Procedure = ({ onChange = () => {}, error, recipeData }) => {
  useEffect(() => {
    onChange(recipeData.instructions)
    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipeData])

  return (
    <Fragment>
      <Grid item>
        <Typography variant="h5" sx={{ paddingLeft: '8px' }}>
          Procedures
        </Typography>
      </Grid>
      <Grid item height="100%" sx={{ overflowY: 'auto' }}>
        <Box
          padding={2}
          component={Card}
          borderRadius={2}
          boxShadow={4}
          margin={1}
          sx={{ minHeight: 'calc(100% - 48px)' }}
        >
          <Grid container>
            <Grid item xs={12}>
              <HtmlEditor
                defaultValue={recipeData.instructions}
                onBlur={(value) => {
                  console.log(value)
                  onChange(value)
                }}
                height="500px"
                // error={true}
                error={error}
                helperText={error && 'please fill in procedure'}
                config={{ allowResizeX: false }}
              />
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Fragment>
  )
}

export default Procedure
Procedure.propTypes = {
  onChange: PropTypes.func,
  error: PropTypes.bool,
  recipeData: PropTypes.object,
}
