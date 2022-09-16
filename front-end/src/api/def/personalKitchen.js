const personalKitchenAPI = {
  personalKitchen: (data) => ({
    method: 'get',
    url: '/personalKitchen',
    headers: {},
  }),
  newRecipe: (data) => ({
    method: 'post',
    url: '/personalKitchen/newRecipe',
    headers: {},
    data: data,
  }),
  getRecipe: (id) => ({
    method: 'get',
    url: `/personalKitchen/${id}`,
    headers: {},
    // responseType: 'blob',
  }),
}
export default personalKitchenAPI