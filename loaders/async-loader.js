module.exports=function (c, s, m) {
  const callback = this.async()

  setTimeout(() => {
    // null很关键
    callback(null, c, s, m)
  }, 1000)
}
