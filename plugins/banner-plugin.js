class BannerPlugin {
  apply(compiler) {
    compiler.hooks.emit.tap('BannerPlugin', (compilation) => {
      const extentions = ['js', 'css']

      const needHandleSource = Object.keys(compilation.assets).filter(assetPath => {

        const segs = assetPath.split('.')
        const ext = segs[segs.length - 1]

        return extentions.includes(ext)
      })

      const prefix = `
      /**
       * Author: Lee_How
       */
      `
      needHandleSource.forEach(s => {
        const source = compilation.assets[s].source()
        const content = prefix + source
        compilation.assets[s] = {

          source() {
            return content
          },
          size() {
            return content.length
          }
        }
      })
    })
  }
}

module.exports = BannerPlugin