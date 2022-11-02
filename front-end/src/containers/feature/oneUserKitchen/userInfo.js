import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FaceIcon from '@mui/icons-material/Face';
//import { Box } from '@mui/system';
import { socketIo } from '../../../socket';
import { Button, Box, stepIconClasses } from '@mui/material';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
export const UserInfo = (props) => {
    const { userId } = useParams()
    const handleRequestClick = () => {
        let type
        //accept the friend request 
        if(props.friendStatus == 2){
            setStatus('Friends')
            setIcon(<HowToRegIcon />)
            props.friendStatus = 4
            socketIo.socket.emit('sendFriendNoti', {type: 2, receiver: receiver})
        }
        //send the friend request
        else if(props.friendStatus == 3){
            props.friendStatus = 1
            setStatus('Already Sent Request')
            setIcon(<PersonAddIcon />)
            socketIo.socket.emit('sendFriendNoti', {type: 1, receiver: receiver})
        }

    }
    console.log(props.friendStatus)
    return(
        <Box sx = {{ mx: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '70vw', height: '20vh'}}>
            <FaceIcon sx = {{ fontSize: '80px' }} />
            {props.friendStatus != 4 && <Button onClick = {() => handleRequestClick()}>{props.icon} {props.status}</Button>}
            {props.friendStatus == 4 && <Button><HowToRegIcon />Friends</Button>}
        </Box>
    )
}