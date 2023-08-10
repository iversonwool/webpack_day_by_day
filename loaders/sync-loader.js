// module.exports = function (content, map, meta) {
//   console.log("test-loader", content)
//   return content
// }

module.exports = function (content, map, meta) {

  console.log("test-loader", content)

  this.callback(null, content, map, meta)
}