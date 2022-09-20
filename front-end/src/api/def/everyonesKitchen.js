const everyonesKitchenAPI = {
  everyonesKitchen: (data) => ({
    method: 'get',
    url: '/everyonesKitchen',
    headers: {},
  }),
  getRecipe: (id) => ({
    method: 'get',
    url: `/everyonesKitchen/${id}`,
    headers: {},
    // responseType: 'blob',
  }),
}
export default everyonesKitchenAPI
