const loaderUtils = require('loader-utils')

module.exports = function (c) {
  //1.改变文件名
  let interpolatedName = loaderUtils.interpolateName(
    this,
    "images/[hash].[ext][query]",
    {
      content: c
    }
  );
  //2.生成文件
  this.emitFile(interpolatedName, c)
  //3.暴露出去
  return `module.exports = "${interpolatedName}"`
}

module.exports.raw = true