const chai = require('chai')
const chaiHttp = require('chai-http')
const dotenv = require('dotenv')
const expect = chai.expect 
const server = require('../server')
chai.use(chaiHttp)
dotenv.config()
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
const agent = chai.request.agent(server)


describe('test user logins then logouts successfully. Then if they enter the wrong password => fail to login', ()=>{
  //valid password
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
                })
  })
  it("should return status 200", (done)=>{
    const res = agent.post('/logout')
                    .then(function(res){
                      expect(res).to.have.status(200)
                      expect(res.text).to.be.a('string')
                      done()
                    })

  })
  //invalid password
  it("should return status 401", (done)=>{
    const res = agent.post('/login').type('form')
                .send({username: process.env.TEST_USERNAME, password: process.env.TEST_INVALID_PASSWORD})
                .then(function(res){
                  expect(res).to.have.status(401)
                  expect(res.text).to.be.a('string')
                 done()
  })
})
})

describe('test register successfully with unique username + unique email and login successfully', ()=>{
  it("should return status 200", (done)=>{
    const res = agent.post('/register').type('form')
                  .send({username: process.env.TEST_UNIQUE_USERNAME, password: process.env.TEST_PASSWORD, email: process.env.TEST_UNIQUE_EMAIL})
                  .then(function(res){
                    console.log(res)
                    expect(res).to.have.status(200)
                    expect(res.text).to.be.a('string')
                    done()
                  })
  })
  it("should return status 200 along with user's information", (done)=>{
    const res = agent.post('/login').type('form')
                  .send({username: process.env.TEST_UNIQUE_USERNAME, password: process.env.TEST_PASSWORD})
                  .then(function(res){
                    const body = res.body
                    expect(res).to.have.status(200)
                    expect(res).to.have.cookie('sid')    
                    expect(body).to.have.property('username')
                    expect(body).to.have.property('email')
                    expect(body).to.have.property('id')
                    expect(body).to.have.property('role')
                    done()
                })
  })
})

/*it("should return status 403", (done)=>{
  const res = agent.post('/register').type('form')
                  .send({username: process.env.TEST_USERNAME, password: process.env.TEST_PASSWORD, email: process.env.TEST_EMAIL})
                  .then(function(res){
                    console.log(res)
                    expect(res).to.have.status(403)
                    expect(res.text).to.be.a('string')
                    done()
})*/



