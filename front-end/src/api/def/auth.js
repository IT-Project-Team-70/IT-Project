//const https = require('https')

/*const agent = new https.agent({
  rejectUnauthorized: false,
})
const httpsAgent = {
  httpsAgent: agent,
}*/
const authAPI = {
  login: (data) => ({
    method: 'post',
    url: '/login',
    headers: {},
    data: {
      ...data,
    },
  }),
  logout: () => ({
    method: 'post',
    url: '/logout',
    headers: {},
    data: {},
  }),
  register: (info) => ({
    method: 'post',
    url: '/register',
    headers: {},
    data: {
      password: info.password,
      username: info.username,
      email: info.email,
    },
  }),
  forgetPassword: (data) => ({
    method: 'get',
    url: '/forgetPassword',
    headers: {
      // email:''
      ...data,
    },
  }),
}
export default authAPI
