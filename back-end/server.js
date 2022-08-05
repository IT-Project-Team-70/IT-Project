const express = require('express')
const dotenv = require('dotenv') 
const mongoose = require('mongoose')
//app
app = express()
dotenv.config()

//loading environment variable
const port = process.env.PORT 
const database = process.env.DATABASE

//database
 mongoose.connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('database is connected'))


app.listen(port, () =>{
  console.log(`Ther server is running on ${port}`)
})