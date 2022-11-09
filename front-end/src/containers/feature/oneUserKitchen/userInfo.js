import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import FaceIcon from '@mui/icons-material/Face'
import { socketIo } from '../../../socket'
import { Button, Box, Typography, Divider, Popover } from '@mui/material'
import HowToRegIcon from '@mui/icons-material/HowToReg'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import AlertDialog from '../../../component/alertDialog'
import PersonAddDisabledIcon from '@mui/icons-material/PersonAddDisabled'
import PropTypes from 'prop-types'

export const UserInfo = ({
  friendStatus,
  setFriendStatus = () => {},
  profile,
}) => {
  const { userId } = useParams()
  const [anchorEl, setAnchorEl] = useState(null)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined
  const initialAlertDialogState = {
    open: false,
    message: '',
  }
  const [alertDialog, setAlertDialog] = useState(initialAlertDialogState)
  const handleRequestClick = () => {
    //accept the friend request
    if (friendStatus === 2) {
      setFriendStatus(4)
      socketIo.socket.emit('sendFriendNoti', { type: 2, receiver: userId })
    }
    //send the friend request
    else if (friendStatus === 3) {
      //friendStatus = 1
      setFriendStatus(1)
      socketIo.socket.emit('sendFriendNoti', { type: 1, receiver: userId })
    }
  }
  const rejectFriendRequest = () => {
    socketIo.socket.emit('rejectFriendRequest', userId)
    window.location.reload(false)
  }
  const handleOnDeleteClick = () => {
    socketIo.socket.emit('unFriend', userId)
    window.location.reload(false)
  }
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '50%',
        height: '300px',
        flexDirections: 'column',
        alignItems: 'center',
        borderRadius: '30px',
        backgroundColor: 'white',
        mx: 'auto',
      }}
    >
      <FaceIcon sx={{ fontSize: '130px', color: '#00A86B' }} />
      <Typography variant="h5" sx={{ marginBottom: '20px' }}>
        <strong>{profile.username}</strong>
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          width: '100%',
        }}
      >
        <span>
          <Typography variant="subtitle1" color="#560319" textAlign="center">
            {profile.recipes.length}
          </Typography>
          <Typography variant="subtitle2" color="#757575" textAlign="center">
            recipes
          </Typography>
        </span>
        <Divider orientation="vertical" />
        <span>
          <Typography variant="subtitle1" color="#560319" textAlign="center">
            {profile.friends.length}
          </Typography>
          <Typography variant="subtitle2" color="#757575" textAlign="center">
            followers
          </Typography>
        </span>
        <Divider orientation="vertical" />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '20px',
          }}
        >
          {friendStatus === 1 && (
            <Button
              onClick={() => handleRequestClick()}
              variant="contained"
              startIcon={<PersonAddIcon />}
            >
              Already Sent Request
            </Button>
          )}
          {friendStatus === 2 && (
            <Button
              onClick={() => rejectFriendRequest()}
              variant="contained"
              startIcon={<PersonAddDisabledIcon />}
            >
              Reject Request
            </Button>
          )}
          {friendStatus === 2 && (
            <Button
              onClick={() => handleRequestClick()}
              variant="contained"
              startIcon={<PersonAddIcon />}
            >
              Accept Request
            </Button>
          )}
          {friendStatus === 3 && (
            <Button
              onClick={() => handleRequestClick()}
              variant="contained"
              startIcon={<PersonAddIcon />}
            >
              Add Friends
            </Button>
          )}
          {friendStatus === 4 && (
            <Button
              onClick={(e) => handleClick(e)}
              variant="contained"
              startIcon={<HowToRegIcon />}
            >
              Friends
            </Button>
          )}
        </Box>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
        >
          <Typography
            sx={{ p: 2 }}
            onClick={() => {
              setAlertDialog({
                open: true,
                message: `Are you sure you want to unfriend?`,
              })
            }}
          >
            Unfriend
          </Typography>
        </Popover>
      </Box>
      <AlertDialog
        open={alertDialog.open}
        onClose={() => {
          setAlertDialog(initialAlertDialogState)
        }}
        onConfirm={handleOnDeleteClick}
        onCancel={() => {}}
        alertText={alertDialog.message}
      />
    </Box>
  )
}

UserInfo.propTypes = {
  friendStatus: PropTypes.number,
  setFriendStatus: PropTypes.func,
  profile: PropTypes.object,
}
