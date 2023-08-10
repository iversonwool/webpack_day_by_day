function rawLoader(c) {
  // Buffer数据 一般用于图片 图标类资源
  console.log('raw-loader', c)
  return c
}

rawLoader.raw = true

module.exports = rawLoader