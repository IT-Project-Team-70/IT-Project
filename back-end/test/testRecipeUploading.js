const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server.js')
const authHelper = require('../helper/authHelper')
const expect = chai.expect
chai.use(chaiHttp)
const agent =  chai.request.agent(server)
describe("GET /personalKitchen", ()=> {
  it("should return status 200 along with user's information", (done)=>{
    const res = agent.post('/login').type('form')
                  .send({username: process.env.TEST_USERNAME, password: process.env.TEST_PASSWORD})
                  .then(function(res){
                    const body = res.body
                    expect(res).to.have.status(200)
                    expect(res).to.have.cookie('sid')    
                    expect(body).to.have.property('username')
                    expect(body).to.have.property('email')
                    expect(body).to.have.property('id')
                    expect(body).to.have.property('role')
                    done()
  })})
  it("should return status 200 with personal kitchen's data", function(done){
    const res = agent.get('/personalKitchen')
                     .then(function(res){
                      const body = res.body
                      expect(res).to.have.status(200)
                      expect(body).to.have.property('recipes')
                      expect(body).to.have.property('tags')
                      expect(body).to.have.property('courses')
                      done()
    })})  
})