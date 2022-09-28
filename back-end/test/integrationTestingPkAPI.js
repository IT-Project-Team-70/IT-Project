const chai = require('chai')
const chaiHttp = require('chai-http')
const chaiThings = require('chai-things')
const dotenv = require('dotenv')
const server = require('../server.js')
const authHelper = require('../helper/authHelper')
const bodyParser = require('body-parser')
const expect = chai.expect
chai.use(chaiHttp)
chai.use(chaiThings)
const agent =  chai.request.agent(server)
dotenv.config()

describe("test all APIS related to personal kitchen", ()=> {
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

  //TEST GET ONE RECIPE BY ID REQUEST - invalid ID
  it("should return status 404 with a message 'Recipe not found'", function(done){
    const res = agent.get(`/personalKitchen/${process.env.TEST_INVALID_RECIPE_ID}`)
                     .then(function(res){
                      expect(res).to.have.status(404)
                      expect(res.text).to.be.a('string')
                      done()
  })})
  //TEST GET ONE RECIPE BY ID REQUEST - valid ID
  it("should return status 200 with a required recipe", function(done){
    const res = agent.get(`/personalKitchen/${process.env.TEST_RECIPE_ID}`)
                     .then(function(res){
                      const body = res.body
                      console.log(body)
                      expect(res).to.have.status(200)
                      //check if the data returned is a right recipe
                      expect(body).to.contain.keys('rating', 'tagNames', '_id','title', 
                      'source', 'tagList', 'courseList', 'tagNameList', 'image', 'description', 'notes',
                      'prepTime', 'serveSize', 'ingredients', 'instructions', 'steps')
                      //check components of the recipe return 
                      //rating
                      expect(body.rating).is.a('number').that.is.greaterThanOrEqual(0)
                      //tagNames 
                      expect(body.tagNames).is.an('array')
                      //_id
                      expect(body._id).is.a('string')
                      //title
                      expect(body.title).is.a('string').that.has.length.greaterThan(0)
                      //source
                      expect(body.source).to.contain.keys('type', 'content', '_id')
                      //tagList
                      expect(body.tagList).is.an('array')
                      //courseList
                      courseList = body.courseList
                      expect(courseList).is.an('array').that.has.length.greaterThan(0)
                      //image 
                      expect(body.image).to.contain.keys('data', 'type', '_id')
                      expect(body.image.data).which.is.a('string').has.length.greaterThan(0)
                      expect(body.image.type).to.be.a('string')
                      expect(body.image._id).to.be.a('string')
                      //description
                      expect(body.description).to.be.a('string').that.has.length.greaterThan(0)
                      //notes
                      expect(body.notes).to.be.a('string').that.has.length.greaterThanOrEqual(0)
                      //preptime
                      expect(body.prepTime).to.contain.keys('hours', 'minutes', '_id')
                      //serve size
                      expect(body.serveSize).to.be.a('number').that.is.greaterThanOrEqual(1)
                      //ingredients
                      ingredients = body.ingredients
                      expect(ingredients).to.be.an('array').that.has.length.greaterThan(0)
                      for(let i = 0; i < ingredients.length; i++){
                        ingre = ingredients[i]
                        expect(ingre).to.contain.keys('name', 'quantity', 'unit', '_id')
                        expect(ingre.name).to.be.a('string').that.has.length.greaterThan(0)
                        expect(ingre.quantity).to.be.a('string').that.has.length.greaterThan(0)
                        expect(ingre.unit).to.be.a('string').that.has.length.greaterThan(0)
                        expect(ingre.quantity).to.be.a('string').that.has.length.greaterThan(0)
                      }
                      //instructions
                      expect(body.instructions).to.be.a('string').that.has.length.greaterThan(0)
                      //steps
                      expect(body.steps).to.be.an('array')
                      done()
    })})

})
