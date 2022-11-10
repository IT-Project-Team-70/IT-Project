import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
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
import LoadingSpinner from '../../../component/loadingSpinner'

const OneUserKitchen = (props) => {
  const theme = useTheme()
  const [ukStatus, setUkStatus] = useState('initial')
  const [recipeList, setRecipeList] = useState([])
  const [friendStatus, setFriendStatus] = useState(null)
  const { userId } = useParams()
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
      setUkStatus('loading')
      callApi({
        apiConfig: oneUserKitchenAPI.getOneUserKitchen(userId),
        onStart: () => {},
        onSuccess: (res) => {
          setUkStatus('success')
          setProfile(res.data.profile)
          setFriendStatus(res.data.friendStatus)
          console.log(res.data)
          setRecipeList(res.data.kitchen)
        },
        onError: (err) => {
          setUkStatus('error')
        },
        onFinally: () => {},
      })
      return () => {
        cancelToken.cancel('Request cancel.')
      }
    }, [cancelToken])

    return recipeList.map((recipe) => {
      return (
        <Grid key={recipe._id}>
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
      <Box sx={{ height: '100%', overflowY: 'auto', position: 'relative' }}>
        <img
          src="/fast-food-background.jpg"
          alt="headerImage"
          style={{ width: '100vw', height: '30vh' }}
        />
        <Box
          style={{
            position: 'absolute',
            width: '100%',
            top: '30%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Box style={{ width: '70vw' }}>
            <ThemeProvider theme={theme}>
              {friendStatus && (
                <UserInfo
                  friendStatus={friendStatus}
                  setFriendStatus={setFriendStatus}
                  profile={profile}
                />
              )}
              <Box
                sx={{
                  display: 'flex',
                  backgroundColor: '#FBEEDB',
                  width: '100%',
                  mx: 'auto',
                  marginTop: '10px',
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
        </Box>
      </Box>
      <LoadingSpinner isLoading={ukStatus === 'loading'} />
    </Box>
  )
}

OneUserKitchen.propTypes = {}

export default OneUserKitchen
