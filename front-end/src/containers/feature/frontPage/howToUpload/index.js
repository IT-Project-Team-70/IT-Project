import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { Typography, ThemeProvider } from '@mui/material'
import useTheme from '../../../../css/muiTheme'
import callApi from '../../../../api/util/callAPI'
import landingAPI from '../../../../api/def/landing'
import AxiosV1 from '../../../../api/axiosV1'
import HtmlEditor from '../../../../component/htmlEditor'
import ReportProblemIcon from '@mui/icons-material/ReportProblem'
import './index.scss'

const HowToUpload = (props) => {
  const theme = useTheme()
  const [instruction, setInstruction] = useState('')
  const [howToUploadStatus, setHowToUploadStatus] = useState('initial')
  const [error, setError] = React.useState({ error: false, errorMessage: '' })
  const [cancelToken] = useState(AxiosV1.CancelToken.source())

  useEffect(() => {
    if (howToUploadStatus === 'initial') {
      setHowToUploadStatus('loading')
      callApi({
        apiConfig: landingAPI.getLanding(),
        onStart: () => {},
        onSuccess: (res) => {
          setInstruction(res.data.instructions)
          setHowToUploadStatus('success')
        },
        onError: (err) => {
          setHowToUploadStatus('error')
          setError({ error: true, errorMessage: err.response.data })
        },
        onFinally: () => {},
      })
      return () => {
        cancelToken.cancel('Request cancel.')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cancelToken])
  return (
    <Box
      height="inherit"
      sx={{
        backgroundColor: '#FBEEDB',
        overflow: 'auto',
      }}
    >
      <ThemeProvider theme={theme}>
        {error.error ? (
          <Box
            display="flex"
            flexDirection={'column'}
            alignItems="center"
            height="inherit"
            justifyContent="center"
          >
            <ReportProblemIcon fontSize="large" />
            Oops something went wrong!
            <Typography
              variant="body"
              color="primary"
              sx={{ textAlign: 'center' }}
            >
              {error.message}
            </Typography>
          </Box>
        ) : (
          <Box
            width="inherit"
            display="flex"
            flexDirection="row"
            justifyContent="center"
            p={2}
            className="instruction"
          >
            <HtmlEditor
              readOnly={true}
              value={instruction}
              config={{
                allowResizeX: false,
                allowResizeY: false,
                height: 'auto',
              }}
            />
          </Box>
        )}
      </ThemeProvider>
    </Box>
  )
}

HowToUpload.propTypes = {}

export default HowToUpload
