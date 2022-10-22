import React, { Fragment, useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
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
import { EDIT_RECIPE, RECIPE } from '../../routes/routeConstant'
import {
  Popover,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { Box } from '@mui/system'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import AlertDialog from '../../component/alertDialog'

export default function RecipeCard({
  image = '',
  hasFavorite = true,
  hasToolButton = false,
  isfavorite = false,
  onChange = () => {},
  ...props
}) {
  const [recipeImage, setImage] = useState(image)
  const [favorited, setFavorited] = useState(isfavorite)
  const history = useHistory()
  const [anchorEl, setAnchorEl] = useState(null)
  const initialAlertDialogState = {
    open: false,
    message: '',
  }
  const [alertDialog, setAlertDialog] = useState(initialAlertDialogState)

  const GetRecipeImage = () => {
    const [cancelToken] = useState(AxiosV1.CancelToken.source())

    useEffect(() => {
      if (recipeImage === '') {
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
          },
          onError: (err) => {},
          onFinally: () => {},
        })
      } else {
        setImage(
          URL.createObjectURL(
            new Blob([new Uint8Array(JSON.parse(image))], {
              type: 'image/png',
            })
          )
        )
      }
      return () => {
        cancelToken.cancel('Request cancel.')
      }
    }, [cancelToken])

    return (
      <CardMedia
        component="img"
        sx={{
          m: 0,
          height: 210,
          width: 320,
        }}
        alt="Food Image"
        src={recipeImage}
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
            onChange()
          },
          onError: (err) => {},
          onFinally: () => {},
        })
  }
  const handleRatingClick = (newRating) => {
    callApi({
      apiConfig: everyonesKitchenAPI.addRating(props.recipeID, newRating),
      onStart: () => {},
      onSuccess: (res) => {
        onChange()
      },
      onError: (err) => {},
      onFinally: () => {},
    })
  }
  const handleOnDeleteClick = () => {
    callApi({
      apiConfig: personalKitchenAPI.deleteRecipe(props.recipeID),
      onStart: () => {},
      onSuccess: (res) => {
        onChange()
      },
      onError: (err) => {},
      onFinally: () => {},
    })
  }
  return (
    <Fragment>
      <Card id={props.recipeID} sx={{ width: 335, flexShrink: 0 }}>
        <CardActions
          disableSpacing
          onClick={() => history.push(RECIPE.replace(':id', props.recipeID))}
        >
          <Box>{GetRecipeImage(props.recipeID)}</Box>
        </CardActions>
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: 'calc(100% - 36px)',
              }}
            >
              <Typography variant="body1" color="text.primary">
                {props.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" noWrap>
                {props.description}
              </Typography>
            </Box>
            {hasToolButton && (
              <Fragment>
                <IconButton
                  onClick={(event) => {
                    setAnchorEl(event.currentTarget)
                  }}
                >
                  <MoreHorizIcon fontSize="small" />
                </IconButton>
                <Popover
                  open={anchorEl !== null}
                  anchorEl={anchorEl}
                  onClose={() => {
                    setAnchorEl(null)
                  }}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                >
                  <List sx={{ width: '240px' }}>
                    <ListItem disablePadding>
                      <ListItemButton
                        onClick={() => {
                          history.push(
                            EDIT_RECIPE.replace(':id', props.recipeID)
                          )
                        }}
                      >
                        <ListItemIcon>
                          <EditIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Edit'} />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton
                        onClick={() =>
                          setAlertDialog({
                            open: true,
                            message: `The Recipe "${props.title}" will be deleted, do you still wish to proceed?`,
                          })
                        }
                      >
                        <ListItemIcon>
                          <DeleteIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Delete'} />
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Popover>
              </Fragment>
            )}
          </Box>
        </CardActions>
        <CardActions disableSpacing>
          <Rating
            name="recipe-rating"
            value={props.rating}
            onChange={(event, newRating) => {
              handleRatingClick(newRating)
            }}
            sx={{ marginRight: 20.5 }}
          />
          {hasFavorite && (
            <IconButton
              aria-label="favorites"
              align="right"
              onClick={() => handleFavoriteClick()}
            >
              {favorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          )}
        </CardActions>
      </Card>
      <AlertDialog
        open={alertDialog.open}
        onClose={() => {
          setAlertDialog(initialAlertDialogState)
        }}
        onConfirm={handleOnDeleteClick}
        onCancel={() => {}}
        alertText={alertDialog.message}
      />
    </Fragment>
  )
}

RecipeCard.propTypes = {
  recipeID: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  rating: PropTypes.number,
  image: PropTypes.string,
  hasFavorite: PropTypes.bool,
  hasToolButton: PropTypes.bool,
  isfavorite: PropTypes.bool,
  onChange: PropTypes.func,
}
