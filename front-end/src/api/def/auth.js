const authAPI = {
  login: (data) => ({
    method: 'post',
    url: '/login',
    headers: {},
    data: {
      // username: '',
      // password: '',
      ...data,
    },
  }),
  logout: () => ({
    method: 'post',
    url: '/logout',
    headers: {},
    data: {},
  }),
  register: (data) => ({
    method: 'post',
    url: '/register',
    headers: {},
    data: {
      // "password":"00000000",
      // "username":"user01",
      // "email":"user01@mail.com"
      ...data,
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
  test: (data) => ({
    method: 'GET',
    url: 'https://nominatim.openstreetmap.org/search.php?q=test&format=json',
    headers: {},
    data: {
      // username: '',
      // password: '',
    },
  }),
}
export default authAPI
