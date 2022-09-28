const pkController = require('../../controllers/personalKitchenController')
const testData = require('../testingData')

describe('start testing for backend personal kitchen controllers', () => {
  //
  test('test for get personal kitchen', async () => {
    const req = {
      params: {
        id: 1,
      },
      user: testData.user,
    }
    const res = {
      json: jest.fn(),
    }
    await pkController.getPersonalKitchen(req, res)
    expect(res.json).toHaveBeenCalled()
  })

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
    await pkController.getOneRecipe(req, res)
    expect(res.json).toHaveBeenCalled()
  })

  //
  test('test for registering a new recipe into DB', async () => {
    const req = {
      body: {
        name: 'test',
        description: 'test',
        userId: 1,
      },
    }
    const res = {
      json: jest.fn(),
    }
    await pkController.createPersonalKitchen(req, res)
    expect(res.json).toHaveBeenCalled()
  })

  //
  test('test for editing old recipes', async () => {})

  //
  test('test for deleting old recipe', async () => {})
})
