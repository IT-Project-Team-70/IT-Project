const chai = require('chai')
const chaiHttp = require('chai-http')
const dotenv = require('dotenv')
const expect = chai.expect 
const server = require('../server')
chai.use(chaiHttp)
dotenv.config()
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const agent = chai.request.agent(server)

//TEST THE LOGIN POST REQUEST - The user logs in successfully and get access to the personal kitchen route
//Status 200
describe('POST /login', ()=>{
  it("should return status 200 along with user's information and user can visit /personalKitchen", (done)=>{
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
                    return agent.get('/personalKitchen').then(function(res){
                      expect(res).to.have.status(200)
                      done()
                    })
                  })
  })
})

//TEST THE LOGOUT POST REQUEST
//Status 200
describe('POST /logout', ()=>{
  it("should return status 200", (done)=>{
    const res = agent.post('/logout')
                    .then(function(res){
                      console.log(res)
                      expect(res).to.have.status(200)
                      expect(res.text).to.be.a('string')
                      done()
                    })

  })
})

//TEST THE LOG IN POST REQUEST - The user fails to log in 
//Status 401
describe('POST /login', ()=>{
  it("should return status 401 and user cannot visit /personalKitchen", (done)=>{
    const res = agent.post('/login').type('form')
                .send({username: process.env.TEST_USERNAME, password: process.env.TEST_INVALID_PASSWORD})
                .then(function(res){
                  expect(res).to.have.status(401)
                  expect(res.text).to.be.a('string')
                  return agent.get('/personalKitchen').then(function(res){
                    console.log(res)
                    expect(res).to.have.status(401)
                    done()
                  })
                })
  })
})

//TEST THE REGISTER POST REQUEST - no duplicate usernames
//Status 200 
describe('POST /register', ()=>{
  it("should return status 200", (done)=>{
    const res = agent.post('/register').type('form')
                  .send({username: process.env.TEST_UNIQUE_USERNAME, password: process.env.TEST_PASSWORD, email: process.env.TEST_EMAIL})
                  .then(function(res){
                    expect(res).to.have.status(200)
                    expect(res.text).to.be.a('string')
                    //expect(res.body.message).to.be.a('string')
                    done()
                  })
  })
})

//TEST THE REGISTER POST REQUEST - duplicate usernames
//Status 403
/*describe('POST /register', ()=>{
  it("should return status 403", (done)=>{
    const res = agent.post('/register').type('form')
                    .send({username: process.env.TEST_USERNAME, password: process.env.TEST_PASSWORD, email: process.env.TEST_EMAIL})
                    .then(function(res){
                      console.log(res)
                      expect(res).to.have.status(403)
                      expect(res.text).to.be.a('string')
                      done()
                    })
  })
})*/

