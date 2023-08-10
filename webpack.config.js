
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, './bundle'),
    filename: "js/[name].js",
    clean: true
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
      {
        test: /\.js$/,
        loader: "./loaders/banner-loader/index.js",
        options: {
          author: "How_Lee"
        }

      },
      {
        test: /\.js$/,
        loader: "./loaders/babel-loader/index.js",
        options: {
          presets: ["@babel/preset-env"]
        }

      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html")
    })
  ],
  mode: "development"
}