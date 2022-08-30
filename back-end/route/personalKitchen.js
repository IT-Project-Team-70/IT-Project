const express = require('express')
const router = express.Router()

const { isAuthenticated, hasRole } = require('../helper/auth')

const pkController = require('../controllers/personalKitchenController')


/* ********************************************************************************************* */
router.get('/', isAuthenticated, (req, res) => {
  // res.redirect('/personalKitchen/home')
  return res.status(200).send(req.passport.session.user);
})

router.get('/home', isAuthenticated, (req, res) => {})
router.get('/personal-kitchen', isAuthenticated, (req, res) => {})
router.get('/personal-kitchen/:id', isAuthenticated, (req, res) => {})

router.get('/personal-kitchen/category', isAuthenticated, (req, res) => {})
router.get('/personal-kitchen/category/:id', isAuthenticated, (req, res) => {})

router.get('/personal-kitchen/favorite', isAuthenticated, (req, res) => {})
router.get('/personal-kitchen/favorite/:id', isAuthenticated, (req, res) => {})


// editing old recipes
router.post('/personal-kitchen/:id', isAuthenticated, (req, res) => {})
// post a new recipe into the database
router.post('/personal-kitchen/new-recipe', isAuthenticated, (req, res) => {})
// change recipe tags, move into another category
router.post('/personal-kitchen/tag-recipe/:id', isAuthenticated, (req, res) => {})


// delete a recipe from the database
router.delete('/personal-kitchen/:id', isAuthenticated, (req, res) => {})


module.exports = app;
