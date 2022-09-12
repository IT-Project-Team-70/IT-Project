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
    method: 'post',
    url: '/forgetPassword',
    headers: {},
    data: {
      // email:''
      ...data,
    },
  }),
  loginWithGoogle: () => ({
    method: 'get',
    url: '/google',
    headers: {},
  }),
}
export default authAPI
