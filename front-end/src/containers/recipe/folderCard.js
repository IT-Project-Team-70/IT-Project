import * as React from 'react'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { ThemeProvider } from '@mui/material'
import useTheme from '../../css/muiTheme'
import placeholderImage from './PlaceholderImage.png'

export default function FolderCard(props) {
  const theme = useTheme()
  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ width: 380, bgcolor: 'primary.main', flexShrink: 0 }}>
        <CardMedia
          component="img"
          height="350"
          image={placeholderImage}
          alt="Folder Image"
        />
        <CardContent>
          <Typography variant="h4" color="white">
            (Folder Name Here)
          </Typography>
        </CardContent>
      </Card>
    </ThemeProvider>
  )
}

FolderCard.propTypes = {}
