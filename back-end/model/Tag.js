const { default: mongoose } = require('mongoose')
const validation = require('./validation')

/* ***************************************************************************************** */

const tagSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 1, maxlength: 25 },
})

tagSchema.methods.joiValidate = function (tag) {
  return validation.validateTag(tag)
}

const TagModel = mongoose.model('Tag', tagSchema)

/* ***************************************************************************************** */

async function createNewTag(tag) {
  const { error } = tag.joiValidate()
  let existedTag = await TagModel.findOne({ name: tag.name })
  if (existedTag) {
    return existedTag
  }

  try {
    const newTag = new TagModel(tag)
    const result = await newTag.save()
    return result
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
}

/* ***************************************************************************************** */

module.exports = TagModel
