import NotificationsIcon from '@mui/icons-material/Notifications'
import React, {useState, useEffect} from 'react'
import { PropTypes } from 'prop-types'
import { socketIo } from '../../socket'
import { Context } from '../../stores/userStore';
import ListOfNoti from './listOfNoti';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Box } from '@mui/material';
import Badge from '@mui/material/Badge'
import { red } from '@mui/material/colors';

const getUnReadNotifications = (notifications) =>{
  let result = 0
  for(let i = 0; i < notifications.length; i++){
    if(notifications[i].unread){
      result += 1
    }
  }
  return result
}
const NotiPopUp = (props) => {
  const [open, setOpen] = React.useState(false)
  const [userContext] = React.useContext(Context) 
  const [scroll, setScroll] = React.useState('paper')
  const [notifications, addNotifications] = React.useState(userContext.userState.userInfo.notifications)
  const [unreadNotis, setUnreadNotis] = React.useState(getUnReadNotifications(notifications))
  console.log(unreadNotis)
  //real-time data 
  socketIo.socket.on('notifyReceiver', (data) =>{
    console.log(data.length)
    addNotifications(data)
    setUnreadNotis(unreadNotis + 1)
  })
  const handleNotiClick = () =>{
    setOpen(true);
  }
  const handleClose = () =>{
    setOpen(false)
  }
  return(
    <Box sx={{ mr: 2 }}>
      <Badge badgeContent={unreadNotis} color='noti'>
        <NotificationsIcon onClick={() => handleNotiClick()}/>
      </Badge>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        scroll="paper"
      >
        <DialogTitle id="scroll-dialog-title" color="noti.title">Notification</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
        <ListOfNoti notifications={notifications} setUnreadNotis={setUnreadNotis} unreadNotis = {unreadNotis} setOpen = {setOpen}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
NotiPopUp.PropTypes = { socket: PropTypes.object}
export default NotiPopUp
//LoginPanel.propTypes = { onChange: PropTypes.func, onClose: PropTypes.func }
