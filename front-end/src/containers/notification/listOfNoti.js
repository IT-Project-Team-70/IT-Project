import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { ListItem, Divider } from '@mui/material'
import { RECIPE } from '../../routes/routeConstant'
import callApi from '../../api/util/callAPI'
import userAPI from '../../api/def/noti'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  unreadNoti: {
    backgroundColor: '#e3f2fd',
  },
  readNoti: {
    backgroundColor: '#FFFFFF',
  },
})
export default function ListOfNoti(props) {
  console.log(props.notifications)
  const [selectedIndex, setSelectedIndex] = useState(null)
  const classes = useStyles()
  const history = useHistory()
  const handleListItemClick = (event, index, recipeId, notification) => {
    setSelectedIndex(index)
    if (notification.unread && props.unreadNotis > 0) {
      props.setUnreadNotis(props.unreadNotis - 1)
      callApi({
        apiConfig: userAPI.readNoti(notification._id),
        onStart: () => {},
        onSuccess: (res) => {
          console.log(res.data)
        },
        onError: (res) => {
          console.log(res.error)
        },
      })
    }
    props.setOpen(false)
    history.push(RECIPE.replace(':id', recipeId))
  }
  return (
    <List aria-label="main mailbox folders">
      {props.notifications.map((notification, i) => (
        <div key={i}>
          {notification.unread ? (
            <ListItem className={classes.unreadNoti}>
              <ListItemButton
                selected={selectedIndex === i}
                onClick={(event) =>
                  handleListItemClick(
                    event,
                    i,
                    notification.recipeId,
                    notification
                  )
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
                  handleListItemClick(
                    event,
                    i,
                    notification.recipeId,
                    notification
                  )
                }
              >
                <ListItemText>{notification.message}</ListItemText>
              </ListItemButton>
            </ListItem>
          )}
          {i != props.notifications.length - 1 && <Divider />}
        </div>
      ))}
    </List>
  )
}
//ListOfNoti.PropTypes = {notifications: PropTypes.array}
