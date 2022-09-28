const pkController = require('../../controllers/personalKitchenController')

describe('start testing for backend personal kitchen controllers', () => {
  //
  test('test for getting datas to render the page', async () => {
    const req = {
      params: {
        id: 1,
      },
    }
    const res = {
      json: jest.fn(),
    }
    await pkController.getAllPersonalKitchen(req, res)
    expect(res.json).toHaveBeenCalled()
  })

  //
  test('test for getting one recipe by ID', async () => {})

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
