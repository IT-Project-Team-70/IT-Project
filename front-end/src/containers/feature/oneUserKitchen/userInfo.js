import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import FaceIcon from '@mui/icons-material/Face';
import { socketIo } from '../../../socket';
import { Button, Box, Typography, Divider, Popover } from '@mui/material';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AlertDialog from '../../../component/alertDialog'
import { ONE_USER_KITCHEN } from '../../../routes/routeConstant';
export const UserInfo = (props) => {
    const { userId } = useParams()
    const [anchorEl, setAnchorEl] = useState(null)
    const history = useHistory()
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const initialAlertDialogState = {
        open: false,
        message: '',
      }
    const [alertDialog, setAlertDialog] = useState(initialAlertDialogState)
    const handleRequestClick = () => {
        //accept the friend request 
        if(props.friendStatus == 2){
            console.log(2)
            props.setStatus('Friends')
            props.setIcon(<HowToRegIcon />)
            //props.friendStatus = 4
            props.setFriendStatus(4)
            socketIo.socket.emit('sendFriendNoti', {type: 2, receiver: userId})
        }
        //send the friend request
        else if(props.friendStatus == 3){
            console.log(3)
            //props.friendStatus = 1
            props.setFriendStatus(3)
            props.setStatus('Already Sent Request')
            props.setIcon(<PersonAddIcon />)
            socketIo.socket.emit('sendFriendNoti', {type: 1, receiver: userId})
        }

    }
    const rejectFriendRequest = () =>{
        socketIo.socket.emit('rejectFriendRequest', userId)
    }
    const handleOnDeleteClick = ()=>{
        socketIo.socket.emit('unFriend', userId)
        window.location.reload(false)
    }
    return(
        <Box sx = {{display: 'flex', flexDirection: 'column', width: '50%', height: '280px', flexDirections: 'column', alignItems: 'center', borderRadius: '30px', backgroundColor: 'white', mx: 'auto'}}>
            <FaceIcon sx = {{ fontSize: '130px', color: '#00A86B'}} />
            {props.profile && <Typography variant='h5' sx={{marginBottom: '20px'}}><strong>{props.profile.username}</strong></Typography>}
            <Box sx = {{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', width: '100%'}}>
                <span>
                    {props.profile && <Typography variant='subtitle1'color='#560319' textAlign='center'>{props.profile.recipes.length}</Typography>}
                    <Typography variant='subtitle2' color='#757575' textAlign='center'>recipes</Typography>
                </span>
                <Divider orientation='vertical' />
                <span>
                    {props.profile && <Typography variant='subtitle1' color='#560319' textAlign='center'>{props.profile.friends.length}</Typography>}
                    <Typography variant='subtitle2' color='#757575' textAlign='center'>followers</Typography>
                </span>
                <Divider orientation='vertical' />
                {props.friendStatus != 4 && <Button onClick={() => handleRequestClick()} variant='contained' size='small'>{props.status}</Button>}
                {props.friendStaus == 2 && <Button onClick = {() => rejectFriendRequest()}>Reject Friend Request</Button>
                }
                {props.friendStatus == 4 && <Button variant='contained' size = 'small' sx={{height: '40px', width: '100px'}} startIcon={<HowToRegIcon  />} onClick={handleClick}>Friends</Button>}
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
                <Typography sx={{ p: 2 }} onClick={() => {setAlertDialog({open: true, message: 
                `Are you sure you want to unfriend?`})}}>Unfriend</Typography>
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