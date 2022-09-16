import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import FavoriteIcon from '@mui/icons-material/Favorite'
import Rating from '@mui/material/Rating'
import PropTypes from 'prop-types'
import AxiosV1 from '../../api/axiosV1'
import personalKitchenAPI from '../../api/def/personalKitchen'
import { callApi } from '../../api/util/callAPI'

export default function RecipeCard(props) {
  const GetRecipeImage = () => {
    const [image, setImage] = useState('')
    const [cancelToken] = useState(AxiosV1.CancelToken.source())
    useEffect(() => {
      callApi({
        apiConfig: personalKitchenAPI.getRecipe(props.recipeID),
        onStart: () => {},
        onSuccess: (res) => {
          setImage(
            URL.createObjectURL(
              new Blob([new Uint8Array(JSON.parse(res.data.image.data))], {
                type: 'image/png',
              })
            )
          )
          // console.log(new Blob(res.data.image.data))
        },
        onError: (err) => {
          console.log(err)
        },
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
          m: 1,
          height: 210,
          width: 320,
        }}
        alt="Food Image"
        src={image}
      />
    )
  }
  return (
    <Card id={props.recipeID} sx={{ width: 335, flexShrink: 0 }}>
      {GetRecipeImage(props.recipeID)}
      <CardContent sx={{ p: 0.5, paddingLeft: 1.5 }}>
        <Typography variant="body1" color="text.primary">
          {props.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
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
        <IconButton aria-label="add to favorites" align="right">
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}

RecipeCard.propTypes = {
  recipeID: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  rating: PropTypes.number,
}
