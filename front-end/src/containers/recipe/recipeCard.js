import * as React from 'react'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import FavoriteIcon from '@mui/icons-material/Favorite'
import Rating from '@mui/material/Rating'
import PropTypes from 'prop-types'
import placeholderImage from './PlaceholderImage.png'

export default function RecipeCard(props) {
  return (
    <Card sx={{ width: 335, flexShrink: 0 }}>
      <CardMedia
        component="img"
        sx={{
          m: 1,
          height: 210,
          width: 320,
        }}
        alt="Food Image"
        src={placeholderImage}
      />
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
  name: PropTypes.string,
  description: PropTypes.string,
  rating: PropTypes.number,
}
