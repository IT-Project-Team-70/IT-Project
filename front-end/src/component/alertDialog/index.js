import React from 'react'
import PropTypes, { oneOfType } from 'prop-types'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material'
import WarningRoundedIcon from '@mui/icons-material/WarningRounded'

const AlertDialog = ({
  open = false,
  title = '',
  alertText = 'This is an alert dialog!',
  onClose = () => {},
  onConfirm = false,
  onCancel = false,
  ...other
}) => {
  const handleConfirmClick = () => {
    onConfirm()
    // onClose()
  }
  const handleCancelClick = () => {
    onCancel()
    onClose()
  }
  const handleCloseClick = () => {
    onClose()
  }
  return (
    <Dialog
      open={open}
      onClose={handleCloseClick}
      maxWidth="xs"
      fullWidth
      {...other}
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between">
          <Box display="flex" flexDirection="row" alignItems="center">
            <Typography component="h6" variant="h6" color="error">
              {title}
            </Typography>
          </Box>
          <IconButton onClick={handleCloseClick} size="small">
            X
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <WarningRoundedIcon fontSize="large" sx={{ paddingBottom: '8px' }} />
        <DialogContentText color="textPrimary">{alertText}</DialogContentText>
      </DialogContent>
      <DialogActions
        disableSpacing={false}
        sx={{
          justifyContent: 'flex-end',
        }}
      >
        {onConfirm !== false ? (
          <Button onClick={handleConfirmClick}>Confrim</Button>
        ) : null}
        {onCancel !== false ? (
          <Button variant="contained" onClick={handleCancelClick}>
            CAncel
          </Button>
        ) : null}
      </DialogActions>
    </Dialog>
  )
}

export default AlertDialog
AlertDialog.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.node,
  alertText: PropTypes.node,
  onClose: PropTypes.func.isRequired,
  onConfirm: oneOfType([PropTypes.func, PropTypes.bool]),
  onCancel: oneOfType([PropTypes.func, PropTypes.bool]),
  icon: PropTypes.node,
}
