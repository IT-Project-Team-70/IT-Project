import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import {
  Button,
  IconButton,
  ListItem,
  MenuItem,
  Typography,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

const Ingredient = ({ onChange = () => {} }) => {
  const [ingredients, setIngredients] = useState({
    0: {
      qan: '',
      unit: 'gram',
      name: '',
    },
  })
  const [ingredientKeys, setIngredientKeys] = useState(Object.keys(ingredients))
  console.log(ingredients)

  return (
    <Fragment>
      <Grid item>
        <Typography variant="h5" sx={{ paddingLeft: '8px' }}>
          Ingredients
        </Typography>
      </Grid>
      <Box
        padding={3}
        component={Card}
        borderRadius={2}
        boxShadow={4}
        margin={1}
      >
        <Grid item height="100%" sx={{ overflowY: 'auto' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {ingredientKeys.map((key, index) => {
                // console.log(Object.keys(ingredients))
                return (
                  key && (
                    <ListItem key={key}>
                      <Box
                        paddingBottom={1}
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'end',
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}
                        >
                          <TextField
                            sx={{
                              paddingRight: '8px',
                              '.MuiInputBase-root': { height: '40px' },
                            }}
                            id="number"
                            required
                            type="number"
                            fullWidth
                            placeholder="Qan."
                            value={ingredients[key].qan}
                            onChange={(e) => {
                              setIngredients((prev) => ({
                                ...prev,
                                [key]: {
                                  ...prev[key],
                                  qan: e.target.value,
                                },
                              }))
                            }}
                          />
                          <TextField
                            sx={{
                              paddingRight: '8px',
                              '.MuiInputBase-root': { height: '40px' },
                            }}
                            id="unit"
                            required
                            select
                            fullWidth
                            value={ingredients[key].unit}
                            defaultValue={'gram'}
                            onChange={(e) => {
                              setIngredients((prev) => ({
                                ...prev,
                                [key]: {
                                  ...prev[key],
                                  unit: e.target.value,
                                },
                              }))
                            }}
                          >
                            <MenuItem value={'gram'}>g</MenuItem>
                            <MenuItem value={'pound'}>lb</MenuItem>
                            <MenuItem value={'ounce'}>oz</MenuItem>
                            <MenuItem value={'unit'}>unit</MenuItem>
                          </TextField>
                        </Box>
                        <TextField
                          id="name"
                          size="medium"
                          placeholder="Apple"
                          variant="standard"
                          fullWidth
                          value={ingredients[key].name}
                          required
                          onChange={(e) => {
                            setIngredients((prev) => ({
                              ...prev,
                              [key]: {
                                ...prev[key],
                                name: e.target.value,
                              },
                            }))
                          }}
                        />
                        {Object.keys(ingredients).length > 1 && (
                          <IconButton
                            size="small"
                            onClick={() => {
                              setIngredients((prev) => {
                                delete prev[key]
                                setIngredientKeys(Object.keys(prev))
                                return prev
                              })
                            }}
                          >
                            <CloseIcon fontSize="inherit" />
                          </IconButton>
                        )}
                      </Box>
                    </ListItem>
                  )
                )
              })}
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}
              >
                <Button
                  variant="contained"
                  onClick={() =>
                    setIngredients((prev) => {
                      prev = {
                        ...prev,
                        [parseInt(
                          Object.keys(prev)[Object.keys(prev).length - 1]
                        ) + 1]: {
                          qan: '',
                          unit: 'gram',
                          name: '',
                        },
                      }
                      setIngredientKeys(Object.keys(prev))
                      return prev
                    })
                  }
                >
                  Add New
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  )
}

export default Ingredient
Ingredient.propTypes = {
  /**for none input fields */
  onChange: PropTypes.func,
}
