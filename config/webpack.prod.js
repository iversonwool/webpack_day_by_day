const path = require('path')

const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: "main.js",
    // 自动清空上次打包资源
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ["postcss-preset-env"]
              }
            }
          }
        ],
      },

      {
        test: /\.less$/i,
        use: [
          // compiles Less to CSS
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ["postcss-preset-env"]
              }
            }
          },
          'less-loader',
        ],
      },

      {
        test: /\.s[ac]ss$/i,
        use: [
          // 将 JS 字符串生成为 style 节点
          MiniCssExtractPlugin.loader,
          // 将 CSS 转化成 CommonJS 模块
          'css-loader',
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ["postcss-preset-env"]
              }
            }
          },
          // 将 Sass 编译成 CSS
          'sass-loader',
        ],
      },

      {
        test: /\.styl$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ["postcss-preset-env"]
              }
            }
          },
          "stylus-loader"
        ], // 将 Stylus 文件编译为 CSS
      },

      {
        test: /\.(png|jpe?g|webp|gif|svg)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            // 将小于10kb的资源转换成base64
            maxSize: 10 * 1024 // 4kb
          },
        },
        generator: {
          filename: 'assets/[hash:10][ext][query]'
        }
      },

      {
        test: /\.(ttf|woff2?)$/i,
        // 不处理资源 原样输出
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash:10][ext][query]'
        }
      },

      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          // 将配置写在.babelrc.js配置文件
          // options: {
          //   presets: ['@babel/preset-env']
          // }
        }
      }
    ]
  },
  plugins: [
    new ESLintPlugin({
      context: path.resolve(__dirname, '../src')
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html')
    }),
    new MiniCssExtractPlugin({
      filename: 'css/index.css'
    })
  ],
  mode: "production",
  // devtool:
  // devServer: {
  //   host: 'localhost',
  //   port: '9527',
  //   open: true
  // }
}