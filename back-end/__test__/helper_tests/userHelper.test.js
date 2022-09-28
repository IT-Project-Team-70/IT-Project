const userHelper = require('../../helper/userHelper')

describe('start testing for backend user helper', () => {
  //
  test('test for getting all users', async () => {}),
    //
    test('test for getting one user by ID', async () => {
      const req = {
        params: {
          id: 1,
        },
        user: testData.user,
      }
      const res = {
        json: jest.fn(),
      }
      await userHelper.getUserById(req, res)
      expect(res.json).toHaveBeenCalled()
    })
})
