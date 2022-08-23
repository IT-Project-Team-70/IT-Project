import axios from 'axios'

// const baseURL = ''
const baseURL = 'http://localhost:8000/'

const AxiosV1 = axios.create({
  baseURL: baseURL,
  // withCredentials: true,
  // headers: { 'Access-Control-Allow-Origin': 'http://localhost:8000' },
  // data: { header: { token: localStorage.token || '' } },
})
AxiosV1.CancelToken = axios.CancelToken
AxiosV1.isCancel = axios.isCancel
// AxiosV1.defaults.withCredentials = true
export const fetchData = async (apiConfig) => {
  const response = await AxiosV1(apiConfig)
  if (response.data.success) {
  } else {
    throw new Error(response.data)
  }
}

export default AxiosV1
