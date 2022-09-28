const recipeHelper = require('../../helper/recipeHelper')
const testData = require('../testingData')

describe('start testing for backend recipe helper', () => {
  //
  test('test for getting all recipes', async () => {
    const req = {
      params: {
        id: 1,
      },
      user: testData.user,
    }
    const res = {
      json: jest.fn(),
    }
    await recipeHelper.getAllRecipes(req, res)
    expect(res.json).toHaveBeenCalled()
  }),
    //
    test('test for getting one recipe by ID', async () => {
      const req = {
        params: {
          id: 1,
        },
        user: testData.user,
      }
      const res = {
        json: jest.fn(),
      }
      await recipeHelper.getOneRecipe(req, res)
      expect(res.json).toHaveBeenCalled()
    })
})
