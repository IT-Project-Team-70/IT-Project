import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import { Typography } from '@mui/material'

const Procedure = ({ onChange = () => {} }) => {
  return (
    <Fragment>
      <Grid item>
        <Typography variant="h5" sx={{ paddingLeft: '8px' }}>
          Procedures
        </Typography>
      </Grid>
      <Box
        padding={3}
        component={Card}
        borderRadius={2}
        boxShadow={4}
        margin={1}
      >
        <Grid item height="100%" sx={{ overflowY: 'auto' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body1">Recipe Title*</Typography>
              <TextField
                id="recipeTitle"
                name="recipeTitle"
                variant="outlined"
                size="medium"
                fullWidth
                required
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  )
}

export default Procedure
Procedure.propTypes = {
  /**for none input fields */
  onChange: PropTypes.func,
}
