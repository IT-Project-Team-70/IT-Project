const ekController = require('../../controllers/everyoneKitchen')
const testData = require('../testingData')

describe('start testing for backend everyone kitchen controllers', () => {
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
    await ekController.getAllRecipes(req, res)
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
      await ekController.getOneRecipe(req, res)
      expect(res.json).toHaveBeenCalled()
    })
})
