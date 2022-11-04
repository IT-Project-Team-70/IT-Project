/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import { ThemeProvider } from '@mui/material'
import useTheme from '../../../css/muiTheme/index'
import RecipeCard from '../../recipe/recipeCard'
import CheckboxList from './checkboxList'
import AxiosV1 from '../../../api/axiosV1'
import { callApi } from '../../../api/util/callAPI'
import oneUserKitchenAPI from '../../../api/def/oneUserKitchen'
import { UserInfo } from './userInfo'
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const OneUserKitchen = (props) => {
  const theme = useTheme()
  const [recipeList, setRecipeList] = useState([])
  const [friendStatus, setFriendStatus] = useState()
  //let friendStatus 
  const { userId }= useParams()
  const [status, setStatus] = useState('')
  const [icon, setIcon] = useState(null)
  const renderStatus = (friendStatus) => {
        // the current online user already sent the request from the profile user and they accept, they will do nothing other than waiting 
        if(friendStatus == 1){
            setStatus('Already Sent Request')
            setIcon(<PersonAddIcon />)
        }
        //the current online user received the request
        else if(friendStatus == 2){
            setStatus('Accept Request')
            setIcon(<PersonAddIcon />)
        }
        //these 2 users are not friends yet
        else if(friendStatus == 3){
            setStatus('Add Friend')
            setIcon(<PersonAddIcon />)
        }
    }
  React.useEffect(() => {
    const url = window.location.href
    if (url.includes('failure')) {
    }
    return () => {}
  }, [])
  const GetKitchen = () => {
    const [cancelToken] = useState(AxiosV1.CancelToken.source())

    useEffect(() => {
      callApi({
        apiConfig: oneUserKitchenAPI.getOneUserKitchen(userId),
        onStart: () => {},
        onSuccess: (res) => {
          setFriendStatus(res.data.friendStatus)
          //friendStatus = res.data.friendStatus
          console.log(friendStatus)
          setRecipeList(res.data.kitchen)
        },
        onError: (err) => {},
        onFinally: () => {},
      })
      return () => {
        cancelToken.cancel('Request cancel.')
      }
    }, [cancelToken])
    useEffect(() => {
      renderStatus(friendStatus)
    }, [friendStatus])
    return recipeList.map((recipe) => {
      return (
        <Grid
          key={recipe._id}
        >
          <RecipeCard
            userId={recipe.userId}
            recipeID={recipe._id}
            title={recipe.title}
            description="Description Placeholder"
            rating={recipe.rating}
          />
        </Grid>
      )
    })
  }

  return (
    <Box
      height="inherit"
      sx={{
        backgroundColor: '#FBEEDB',
      }}
    >
      <UserInfo friendStatus={friendStatus} setFriendStatus = {setFriendStatus} icon={icon} status={status} setStatus={setStatus} setIcon={setIcon}/>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            display: 'flex',
            backgroundColor: '#FBEEDB',
            width: '70vw',
            mx: 'auto',
          }}
        >
          <Box sx={{ paddingLeft: 1 }}>
            <List sx={{ width: '230px' }}>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ marginTop: 3, marginBottom: 3 }}
              >
                Filter Recipe:
              </Typography>
              <Typography variant="body1" fontWeight="bold">
                By Courses:
              </Typography>
              <CheckboxList setRecipes={setRecipeList} />
            </List>
          </Box>
          <Box sx={{ height: '100%', marginLeft: 1 }}>
            <Typography variant="h6" fontWeight="300" sx={{ m: 1 }}>
              Trending
            </Typography>
            <Grid container gap={1}>
              {GetKitchen()}
            </Grid>
          </Box>
        </Box>
      </ThemeProvider>
    </Box>
  )
}

OneUserKitchen.propTypes = {}

export default OneUserKitchen
