class AnalyzePlugin {
  apply(compiler) {

    compiler.hooks.emit.tap('AnalyzePlugin', (compilation) => {
      let prefix = `| 资源名称 | 资源大小 |
| ---- | ---- |`

      Object.entries(compilation.assets).forEach(([filename, file]) => {

        prefix += `\n| ${filename} | ${Math.ceil(file.size() / 1024)}kb`
      })


      compilation.assets['analyze.md'] = {
        source() {
          return prefix
        },
        size() {
          return prefix.length
        }
      }
    })
  }
}

module.exports = AnalyzePlugin