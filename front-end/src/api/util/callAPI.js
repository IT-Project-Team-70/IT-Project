import AxiosV1 from '../axiosV1'

export const callApi = async ({
  apiConfig = {},
  onStart = () => {},
  onSuccess = (resData) => {},
  onError = (error) => {},
  onFinally = () => {},
} = {}) => {
  let result
  try {
    await onStart()
    const res = await AxiosV1(apiConfig)
    if (res.response.status === 200) {
      await onSuccess(res)
      result = res
    } else {
      onError(res)
      // throw new Error(JSON.stringify(res.data, ['message', 'showToUser'], '\t'))
    }
  } catch (error) {
    result = error
    if (AxiosV1.isCancel(error)) {
      console.log(error)
    } else {
      console.error(error)
      await onError(error)
    }
  }
  onFinally()
  return result
}
