import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FaceIcon from '@mui/icons-material/Face';
//import { Box } from '@mui/system';
import { socketIo } from '../../../socket';
import { Button, Box, stepIconClasses } from '@mui/material';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { reject } from 'lodash';
export const UserInfo = (props) => {
    const { userId } = useParams()
    const handleRequestClick = () => {
        let type
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
    //console.log(props.friendStatus)
    return(
        <Box sx = {{ mx: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '70vw', height: '20vh'}}>
            <FaceIcon sx = {{ fontSize: '80px' }} />
            {props.friendStatus != 4 && <Button onClick = {() => handleRequestClick()}>{props.icon} {props.status}</Button>}
            {props.friendStaus == 2 && 
                <Button onClick = {() => rejectFriendRequest()}>Reject Friend Request</Button>
            }
            {props.friendStatus == 4 && <Button><HowToRegIcon /> Friends</Button>}
        </Box>
    )
}