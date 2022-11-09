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
import { socketIo } from '../../../socket'

const OneUserKitchen = (props) => {
  const theme = useTheme()
  const [recipeList, setRecipeList] = useState([])
  const [friendStatus, setFriendStatus] = useState(null)
  const { userId }= useParams()
  //const [status, setStatus] = useState(null)
  const [profile, setProfile] = useState(null)
  React.useEffect(() => {
    const url = window.location.href
    if (url.includes('failure')) {
    }
    return () => {}
  }, [])
  const GetKitchen = () => {
    const [cancelToken] = useState(AxiosV1.CancelToken.source())
    useEffect(() => {
      socketIo.socket.emit('getUserProfile', userId)
      callApi({
        apiConfig: oneUserKitchenAPI.getOneUserKitchen(userId),
        onStart: () => {},
        onSuccess: (res) => {
          setProfile(res.data.profile)
          setFriendStatus(res.data.friendStatus)
          console.log(res.data)
          setRecipeList(res.data.kitchen)
        },
        onError: (err) => {},
        onFinally: () => {},
      })
      return () => {
        cancelToken.cancel('Request cancel.')
      }
    }, [cancelToken])
    
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
      <img src='/fast-food-background.jpg' style={{width: '100vw', height: '30vh'}} />
      <div style={{position: 'absolute',  width: '70vw', top: '30%', left: '15vw'}}>
      {friendStatus && <UserInfo friendStatus={friendStatus} setFriendStatus={setFriendStatus} profile={profile} />}
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            display: 'flex',
            backgroundColor: '#FBEEDB',
            width: '70vw',
            mx: 'auto',
            marginTop: '10px'
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
      </div>
    </Box>
  )
}

OneUserKitchen.propTypes = {}

export default OneUserKitchen
