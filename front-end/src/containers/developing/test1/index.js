import { Box } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import AxiosV1 from '../../../api/axiosV1'
import personalKitchenAPI from '../../../api/def/personalKitchen'
import { callApi } from '../../../api/util/callAPI'

const Test1 = (props) => {
  const [image, setImage] = useState('')
  const [cancelToken] = useState(AxiosV1.CancelToken.source())
  useEffect(() => {
    callApi({
      apiConfig: personalKitchenAPI.getRecipe('6324f0f51ef531cc96d52703'),
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
    <Fragment>
      <Box
        sx={{
          objectFit: 'cover',
          height: '20vh',
        }}
        component="img"
        alt="uploaded image"
        src={image}
      />
    </Fragment>
  )
}

Test1.propTypes = {}

export default Test1
