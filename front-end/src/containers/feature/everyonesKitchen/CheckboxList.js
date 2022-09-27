import React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import PropTypes from 'prop-types'
import { callApi } from '../../../api/util/callAPI'
import everyonesKitchenAPI from '../../../api/def/everyonesKitchen'

export default function CheckboxList(props) {
  const [checked, setChecked] = React.useState([0])
  const tags = ['Asian']

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }

  const updateKitchen = () => {
    callApi({
      apiConfig: everyonesKitchenAPI.everyonesKitchen(tags),
      onStart: () => {},
      onSuccess: (res) => {
        props.setRecipes(res.data.recipes)
      },
      onError: (err) => {},
      onFinally: () => {},
    })
  }

  return (
    <div>
      <List sx={{ width: '90%', bgcolor: 'white', borderRadius: '5%' }}>
        {['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack'].map((value) => {
          const labelId = `checkbox-list-label-${value}`

          return (
            <ListItem key={value} disablePadding>
              <ListItemButton
                role={undefined}
                onClick={handleToggle(value)}
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={value} />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <div />
        <Button
          variant="contained"
          color="secondary"
          onClick={() => updateKitchen()}
        >
          Filter
        </Button>
      </Toolbar>
    </div>
  )
}

CheckboxList.propTypes = {
  setRecipes: PropTypes.func,
}
