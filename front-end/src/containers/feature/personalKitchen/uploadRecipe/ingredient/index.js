import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import { Button, IconButton, MenuItem, Typography } from '@mui/material'
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

  useEffect(() => {
    onChange(ingredientKeys)

    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ingredients, ingredientKeys])

  return (
    <Fragment>
      <Grid item>
        <Typography variant="h5" sx={{ paddingLeft: '8px' }}>
          Ingredients
        </Typography>
      </Grid>
      <Grid item height="100%" sx={{ overflowY: 'auto' }}>
        <Box
          padding={2}
          component={Card}
          borderRadius={2}
          boxShadow={4}
          margin={1}
          sx={{ minHeight: 'calc(100% - 48px)' }}
        >
          <Grid container>
            <Grid item xs={12}>
              {ingredientKeys.map((key, index) => {
                return (
                  key && (
                    <Box
                      key={key}
                      paddingBottom={2}
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
                            // paddingRight: '8px',
                            flexShrink: '5',
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
                            paddingLeft: '8px',
                            flexShrink: '7',
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
        </Box>
      </Grid>
    </Fragment>
  )
}

export default Ingredient
Ingredient.propTypes = {
  /**return indegrients */
  onChange: PropTypes.func,
}
