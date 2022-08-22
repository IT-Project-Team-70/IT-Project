const { default: mongoose } = require('mongoose')

/* ***************************************************************************************** */

const tagSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 1, maxlength: 25 },
})

const TagModel = mongoose.model('Tag', tagSchema)

/* ***************************************************************************************** */

module.exports = {
  Tag: TagModel,
}
