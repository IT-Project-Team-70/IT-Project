const everyonesKitchenAPI = {
  getEveryonesKitchen: (data) => ({
    method: 'get',
    url: '/forum',
    headers: {},
  }),
  everyonesKitchen: (tags) => ({
    method: 'post',
    url: '/forum/filterRecipes',
    headers: {},
    data: {
      tags: tags,
    },
  }),
  addFavorite: (id) => ({
    method: 'post',
    url: `/forum/addFavorite/${id}`,
    headers: {},
  }),
  removeFavorite: (id) => ({
    method: 'post',
    url: `/forum/removeFavorite/${id}`,
    headers: {},
  }),
}
export default everyonesKitchenAPI
