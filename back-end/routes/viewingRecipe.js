const express = require('express')
const router = express()
const viewRecipeController = require('../controllers/viewingRecipeController')
const {isAuthenticated} = require('../helper/authHelper')

router.post('/addComments', isAuthenticated, viewRecipeController.addComments)
router.post('/deleteComments', isAuthenticated, viewRecipeController.deleteComments)
router.post('/editComments', isAuthenticated, viewRecipeController.editComments)
router.post('/likeComments', isAuthenticated, viewRecipeController.likeComments)
router.post('/unlikeComments', isAuthenticated, viewRecipeController.unlikeComments)

module.exports = router
