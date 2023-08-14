
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const TestPlugin = require('./plugins/test-plugin')
const BannerPlugin = require('./plugins/banner-plugin')
const CleanPlugin = require('./plugins/clean-plugin')
const AnalyzePlugin = require('./plugins/analyze-plugin')

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, './bundle'),
    filename: "js/[name].js",
    // clean: true
  },
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   loader: "./loaders/sync-loader.js"
      // }，

      {
        test: /\.js$/,
        // use: [
        //   "./loaders/sync-loader.js",
        //   "./loaders/async-loader.js"
        // ]，
        // loader: "./loaders/raw-loader.js"
        loader: "./loaders/clean-log-loader.js"
      },
      // {
      //   test: /\.js$/,
      //   loader: "./loaders/banner-loader/index.js",
      //   options: {
      //     author: "How_Lee"
      //   }
      //
      // },
      {
        test: /\.js$/,
        loader: "./loaders/babel-loader/index.js",
        options: {
          presets: ["@babel/preset-env"]
        }

      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: "./loaders/file-loader/index.js",
        type: "javascript/auto"

      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/main.html")
    }),
    // new TestPlugin(),
    new BannerPlugin(),
    new CleanPlugin(),
    new AnalyzePlugin()
  ],
  mode: "production",
  optimization: {
    splitChunks: {
      chunks: "all"
    },
    runtimeChunk: {
      name: (e) => `runtime-${e.name}`
    }
  }
  // mode: "development"
}