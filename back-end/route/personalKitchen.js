//const { isAuthenticated, hasRole } = require('../helper/auth')
const express = require("express");
const app = express();

app.get("/personalKitchen", isAuthenticated, (req, res) => {
  return res.status(200).send(req.passport.session.user);
});
module.exports = app;
