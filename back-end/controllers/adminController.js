const userHelper = require('../helper/userHelper')
const recipeHelper = require('../helper/recipeHelper')
const generalHelper = require('../helper/generalHelper')
const User = require('../models/user')

async function getAllUsers(req, res) {}
async function getUserById(req, res) {}

async function registerAdmin(req, res) {}
async function loginAdmin(req, res) {}

async function deleteUserById(req, res) {}

module.exports = {
  getAllUsers,
  getUserById,
  registerAdmin,
  loginAdmin,
  deleteUserById,
}
