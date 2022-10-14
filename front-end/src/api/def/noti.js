const userAPI = {
 readNoti: (data)=>({
  method: 'post',
  url: '/user/readNoti',
  headers: {},
  data: {
    notiId: data
  }
 })
}
export default userAPI
