class CleanPlugin {
  apply(compiler) {
    const outputPath = compiler.options.output.path
    const fs = compiler.outputFileSystem
    compiler.hooks.emit.tap('CleanPlugin', (compilation) => {

      this.removeFile(fs, outputPath)

    })
  }

  removeFile(fs, filePath) {


    const files = fs.readdirSync(filePath)

    files.forEach((file) => {
      const path = `${filePath}/${file}`
      const fileStat = fs.statSync(path)
      if (fileStat.isDirectory()) {
        this.removeFile(fs, path)
      } else {
        fs.unlinkSync(path)
      }
    })
  }
}

module.exports = CleanPlugin