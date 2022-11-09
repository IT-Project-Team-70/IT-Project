import TagFacesIcon from '@mui/icons-material/TagFaces'
import React from 'react'
import { socketIo } from '../../socket'
import { Context } from '../../stores/userStore'
import ListOfNoti from './listOfNoti'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Box } from '@mui/material'
import Badge from '@mui/material/Badge'

const FriendNotiPopUp = (props) => {
  const [open, setOpen] = React.useState(false)
  const [userContext] = React.useContext(Context)
  const countUnread = (notifications) => {
    let result = 0
    for (let i = 0; i < notifications.length; i++) {
      if (notifications[i].unread && notifications[i].isFriendNoti) {
        result += 1
      }
    }
    return result
  }
  let userInfo = userContext.userState.userInfo
  const [unread, setUnread] = React.useState(
    countUnread(userInfo.notifications)
  )
  //real-time data
  socketIo.socket.on('notifyFriendNoti', (notifications) => {
    userContext.dispatch({
      type: 'addNoti',
      payload: {
        username: userInfo.username,
        email: userInfo.email,
        id: userInfo.id,
        notifications: notifications,
      },
    })
    setUnread(unread + 1)
  })
  const handleNotiClick = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <Box sx={{ mr: 2 }}>
      <Badge badgeContent={unread} color="noti">
        <TagFacesIcon
          sx={{ fontSize: '30px' }}
          onClick={() => handleNotiClick()}
        />
      </Badge>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        scroll="paper"
      >
        <DialogTitle id="scroll-dialog-title" color="noti.title">
          Friend Requests
        </DialogTitle>
        <DialogContent dividers>
          <ListOfNoti unread={unread} setUnread={setUnread} setOpen={setOpen} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
//NotiPopUp.propTypes = { socket: PropTypes.object }
export default FriendNotiPopUp
