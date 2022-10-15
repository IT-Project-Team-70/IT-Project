import { createTheme } from '@mui/material'

export const useTheme = () => {
  const theme = createTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#e0470b',
      },
      secondary: {
        main: '#ffac4e',
      },
      warning: {
        main: '#dc0c0c',
      },
      success: {
        main: '#4caf50',
      },
      text: {
        primary: 'rgba(74,6,6,0.87)',
      },
      error: {
        main: '#ff2214',
      },
      noti:{
        main: '#4caf50',
        title: '#0e1111',
        unread: '#2196f3',
      }
    },
  })
  return theme
}

export default useTheme
