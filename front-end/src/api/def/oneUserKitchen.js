const oneUserKitchenAPI = {
  getOneUserKitchen: (userId) => ({
    method: 'get',
    url: `/oneUserKitchen/${userId}`,
    headers: {},
  }),
  filterRecipes: (tags) => ({
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
export default oneUserKitchenAPI