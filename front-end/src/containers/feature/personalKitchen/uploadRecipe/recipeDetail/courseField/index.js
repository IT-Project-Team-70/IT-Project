import PropTypes from 'prop-types'
import { MenuItem, TextField, Typography } from '@mui/material'
import React, { Fragment } from 'react'

const CourseField = ({
  textFieldProps = {},
  status = 'initial',
  options = [],
}) => {
  return (
    <Fragment>
      <Typography variant="body1">Courses*</Typography>
      {status === 'error' && (
        <Typography sx={{ color: 'red' }} variant="body2">
          Oops! There is something wrong
        </Typography>
      )}
      <TextField
        id="courseList"
        name="courseList"
        fullWidth
        select
        required
        defaultValue={''}
        {...textFieldProps}
      >
        {options.map((tag) => (
          <MenuItem key={tag.name} value={tag.name}>
            {tag.name}
          </MenuItem>
        ))}
      </TextField>
    </Fragment>
  )
}

CourseField.propTypes = {
  textFieldProps: PropTypes.object,
  status: PropTypes.string,
  options: PropTypes.array,
}

export default CourseField
