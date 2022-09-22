/*const chai = require('chai')
const chaiHttp = require('chai-http')
const stub = require('stub')
const server = require('../server.js')
const authHelper = require('../helper/authHelper')
const expect = chai.expect

chai.use(chaiHttp)

//test getPersonalKitchen 
describe("GET /personalKitchen", ()=> {
  //Before each request, replace the isAuthenticated middleware with this function
  //to skip the check of log in because here we only want to test the GET API send response 
  beforeEach(()=> {
    loggedinStub =  sinon.stub(authHelper.isAuthenticated).callsFake((req, res, next)=>{next()})
  })
  it("should return status 200", async ()=>{
    let res = await chai.request(server).get('/personalKitchen')
    expect(res).to.have.status(200)
  }
})*/