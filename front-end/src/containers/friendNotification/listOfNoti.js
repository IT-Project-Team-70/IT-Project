import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { ListItem, Divider } from '@mui/material'
import { ONE_USER_KITCHEN } from '../../routes/routeConstant'
import callApi from '../../api/util/callAPI'
import userAPI from '../../api/def/noti'
import { makeStyles } from '@mui/styles'
import { Context } from '../../stores/userStore'
import PropTypes from 'prop-types'

const useStyles = makeStyles({
  unreadNoti: {
    backgroundColor: '#e3f2fd',
  },
  readNoti: {
    backgroundColor: '#FFFFFF',
  },
})

const ListOfNoti = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [userContext] = useContext(Context)
  const notifications = userContext.userState.userInfo.notifications
  const classes = useStyles()
  const history = useHistory()
  const handleListItemClick = (event, index, notification) => {
    if (notification.unread && props.unread > 0) {
      callApi({
        apiConfig: userAPI.readNoti(notification._id),
        onStart: () => {},
        onSuccess: (res) => {
          userContext.dispatch({ type: 'readNoti', payload: res.data })
          props.setUnread(props.unread - 1)
          props.setOpen(false)
          history.push(ONE_USER_KITCHEN.replace(':userId', notification.sender))
        },
        onError: (res) => {
          console.log(res.error)
        },
      })
    } else if (!notification.unread) {
      props.setOpen(false)
      history.push(ONE_USER_KITCHEN.replace(':userId', notification.sender))
    }
    setSelectedIndex(index)
  }
  return (
    <List aria-label="main mailbox folders">
      {notifications
        .filter((noti) => noti.isFriendNoti)
        .map((notification, i) => (
          <div key={i}>
            {notification.unread ? (
              <ListItem className={classes.unreadNoti}>
                <ListItemButton
                  selected={selectedIndex === i}
                  onClick={(event) =>
                    handleListItemClick(event, i, notification)
                  }
                >
                  <ListItemText>{notification.message}</ListItemText>
                </ListItemButton>
              </ListItem>
            ) : (
              <ListItem className={classes.readNoti}>
                <ListItemButton
                  selected={selectedIndex === i}
                  onClick={(event) =>
                    handleListItemClick(event, i, notification)
                  }
                >
                  <ListItemText>{notification.message}</ListItemText>
                </ListItemButton>
              </ListItem>
            )}
            {i !== notifications.length - 1 && <Divider />}
          </div>
        ))}
    </List>
  )
}
ListOfNoti.propTypes = {
  unread: PropTypes.number,
  setUnread: PropTypes.func,
  setOpen: PropTypes.func,
}
export default ListOfNoti
