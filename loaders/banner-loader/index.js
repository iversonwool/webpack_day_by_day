const schema = require('./schema.json')

module.exports = function (c) {
  const options = this.getOptions(schema)


  const prefix = `
    /**
    * author: ${options.author}
    */
  `

  return prefix + c
}