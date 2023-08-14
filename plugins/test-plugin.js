class TestPlugin {
  constructor() {
    console.log('TestPlugin constructor')
  }

  apply(compiler) {
    debugger;
    console.log('Test Plugin apply')


    compiler.hooks.emit.tapAsync('TestPlugin', (compilation, callback) => {
      setTimeout(() => {
        console.log('Test Plugin async callback')
        callback()
      }, 1000)
    })
  }
}

module.exports = TestPlugin