const { default: mongoose } = require('mongoose')
const validation = require('./validation')

/* ***************************************************************************************** */

const tagSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 1, maxlength: 25 },
  isCourse: { type: Boolean, required: true, default: false },
  userCreated: { type: Boolean, required: true, default: false },
})

tagSchema.methods.joiValidate = function (tag) {
  return validation.validateTag(tag)
}

const TagModel = mongoose.model('Tag', tagSchema)

/* ***************************************************************************************** */

module.exports = TagModel
