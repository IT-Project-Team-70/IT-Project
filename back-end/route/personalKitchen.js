const express = require('express')
const router = express.Router()

// const { hasRole } = require('../helper/auth')

const pkController = require('../controller/personalKitchenController')

/* ********************************************************************************************* */
router.get('/', (req, res) => {
  // res.redirect('/personalKitchen/home')
  return res.status(200).send(req.passport.session.user)
})

router.get('/personal-kitchen', (req, res) => {})
router.get('personal-kitchen/home', (req, res) => {})
router.get('/personal-kitchen/:id', (req, res) => {})

router.get('/personal-kitchen/category', (req, res) => {})
router.get('/personal-kitchen/category/:id', (req, res) => {})

router.get('/personal-kitchen/favorite', (req, res) => {})
router.get('/personal-kitchen/favorite/:id', (req, res) => {})

// editing old recipes
router.post('/personal-kitchen/:id', (req, res) => {})
// post a new recipe into the database
router.post('/personal-kitchen/new-recipe', (req, res) => {})
// change recipe tags, move into another category
router.post(
  '/personal-kitchen/tag-recipe/:id',
  // isAuthenticated,
  (req, res) => {}
)

// delete a recipe from the database
router.delete('/personal-kitchen/:id', (req, res) => {})

module.exports = router
