import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import Rating from '@mui/material/Rating'
import PropTypes from 'prop-types'
import AxiosV1 from '../../api/axiosV1'
import personalKitchenAPI from '../../api/def/personalKitchen'
import everyonesKitchenAPI from '../../api/def/everyonesKitchen'
import { callApi } from '../../api/util/callAPI'
import { useHistory } from 'react-router-dom'
import { RECIPE } from '../../routes/routeConstant'

export default function RecipeCard(props) {
  const [image, setImage] = useState('')
  const [favorited, setFavorited] = useState(false)
  const history = useHistory()

  const GetRecipeImage = () => {
    const [cancelToken] = useState(AxiosV1.CancelToken.source())
    useEffect(() => {
      callApi({
        apiConfig: personalKitchenAPI.getRecipe(props.recipeID),
        onStart: () => {},
        onSuccess: (res) => {
          setImage(
            URL.createObjectURL(
              new Blob(
                [new Uint8Array(JSON.parse(res.data.recipe.image.data))],
                {
                  type: 'image/png',
                }
              )
            )
          )
          // console.log(new Blob(res.data.image.data))
        },
        onError: (err) => {},
        onFinally: () => {},
      })
      return () => {
        cancelToken.cancel('Request cancel.')
      }
    }, [cancelToken])
    // console.log(image)
    return (
      <CardMedia
        component="img"
        sx={{
          m: 0,
          height: 210,
          width: 320,
        }}
        alt="Food Image"
        src={image}
      />
    )
  }

  const handleFavoriteClick = () => {
    favorited
      ? callApi({
          apiConfig: everyonesKitchenAPI.removeFavorite(props.recipeID),
          onStart: () => {},
          onSuccess: (res) => {
            setFavorited(!favorited)
          },
          onError: (err) => {},
          onFinally: () => {},
        })
      : callApi({
          apiConfig: everyonesKitchenAPI.addFavorite(props.recipeID),
          onStart: () => {},
          onSuccess: (res) => {
            setFavorited(!favorited)
          },
          onError: (err) => {},
          onFinally: () => {},
        })
  }

  return (
    <Card id={props.recipeID} sx={{ width: 335, flexShrink: 0 }}>
      <CardActions
        disableSpacing
        onClick={() => history.push(RECIPE.replace(':id', props.recipeID))}
      >
        {GetRecipeImage(props.recipeID)}
      </CardActions>
      <CardContent sx={{ p: 0.5, paddingLeft: 1.5 }}>
        <Typography variant="body1" color="text.primary">
          {props.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {props.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Rating
          name="recipe-rating"
          value={props.rating}
          readOnly
          sx={{ marginRight: 20.5 }}
        />
        <IconButton
          aria-label="favorites"
          align="right"
          onClick={() => handleFavoriteClick()}
        >
          {favorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </CardActions>
    </Card>
  )
}

RecipeCard.propTypes = {
  recipeID: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  rating: PropTypes.number,
}
