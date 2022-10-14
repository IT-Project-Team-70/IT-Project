import React,{useState} from 'react';
import { useHistory } from 'react-router-dom';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { PropTypes } from 'prop-types'
import { ListItem } from '@mui/material';
import { RECIPE } from '../../routes/routeConstant'
import callApi from '../../api/util/callAPI';
import userAPI from '../../api/def/noti';
export default function ListOfNoti(props) {
  console.log(props.notifications)
  const [selectedIndex, setSelectedIndex] = useState(0);
  const history = useHistory();
  const unreadNotiStyle= {
    backgroundColor: 'blue'
  }
  const handleListItemClick = (
    event,
    index,
    recipeId,
    notification
  ) => {
    setSelectedIndex(index);
   
    if(notification.unread){
      props.setUnreadNoti(props.unreadNoti - 1);
      callApi({
        apiConfig: userAPI.readNoti(notification._id),
        onStart: ()=>{},
        onSuccess:(res)=>{
          console.log(res.data)
        },
        onError:()=>{
          console.log(res.error)
        }
      })
    }
    history.push(RECIPE.replace(':id', recipeId));
  };
  return (
      <List aria-label="main mailbox folders">
        {props.notifications.map((notification, i) => 
          <ListItem>
           <ListItemButton
           selected={selectedIndex === i}
           onClick={(event) => handleListItemClick(event, i, notification.recipeId, notification)}
          >
          <ListItemText>{notification.message}</ListItemText>
         </ListItemButton>
         </ListItem>
        )}
      </List>
    
  );
}
//ListOfNoti.PropTypes = {notifications: PropTypes.array}
