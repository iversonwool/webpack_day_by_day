const path = require('path')
const os = require('os')
const threads = os.cpus().length

const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require('terser-webpack-plugin')
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const PreloadWebpackPlugin = require("@vue/preload-webpack-plugin");
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')

function commonStyleLoader() {
  return [
    MiniCssExtractPlugin.loader,
    "css-loader",
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: ["postcss-preset-env"]// 配合package.json 的browserslist 设置兼容性做到什么程度
        }
      }
    }
  ]
}


module.exports = {
  entry: './src/a.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: "[name].[contenthash:8].js",
    // 自动清空上次打包资源
    clean: true,
    chunkFilename: "js/[name].[contenthash:8].chunk.js",
    // 图片 字体等
    assetModuleFilename: 'media/[hash:10][ext][query]'
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.css$/i,
            use: commonStyleLoader(),
          },

          {
            test: /\.less$/i,
            use: [
              // compiles Less to CSS
              ...commonStyleLoader(),
              'less-loader',
            ],
          },

          {
            test: /\.s[ac]ss$/i,
            use: [
              // 将 JS 字符串生成为 style 节点
              ...commonStyleLoader(),
              // 将 Sass 编译成 CSS
              'sass-loader',
            ],
          },

          {
            test: /\.styl$/,
            use: [
              ...commonStyleLoader(),
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
            // generator: {
            //   filename: 'assets/[hash:10][ext][query]'
            // }
          },

          {
            test: /\.(ttf|woff2?)$/i,
            // 不处理资源 原样输出
            type: 'asset/resource',
            // generator: {
            //   filename: 'fonts/[hash:10][ext][query]'
            // }
          },

          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            // include: ,
            use: [
              {
                loader: "thread-loader",
                options: {
                  workers: threads
                }
              },
              {
                loader: 'babel-loader',
                // 将配置写在.babelrc.js配置文件
                options: {
                  // presets: ['@babel/preset-env'],
                  // "exclude": [
                  //   // \\ for Windows, \/ for Mac OS and Linux
                  //   /node_modules[\\\/]core-js/,
                  //   /node_modules[\\\/]webpack[\\\/]buildin/,
                  // ],
                  plugins: ["@babel/plugin-transform-runtime"],
                  cacheDirectory: true, // 开启babel编译缓存
                  cacheCompression: false, // 缓存文件不要压缩
                }
              }
            ]
          }
        ]
      }
    ]
  },
  plugins: [
    new ESLintPlugin({
      context: path.resolve(__dirname, '../src'),
      threads
      // exclude: "node_modules"// 默认值
      // cache: true,
      // cacheLocation: path.resolve(__dirname, '../node_modules/.cache/.eslintcache')
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html')
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name][contenthash:8].chunk.css'
    }),
    new PreloadWebpackPlugin({
      rel: "preload", // preload兼容性更好
      as: "script",
      // rel: 'prefetch' // prefetch兼容性更差
    }),
    new WorkboxWebpackPlugin.GenerateSW({
      // 这些选项帮助快速启用 ServiceWorkers
      // 不允许遗留任何“旧的” ServiceWorkers
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
      // 不能漏了这个 不然不会默认开启代码压缩
      // 包括js压缩 和 css压缩
      // `...`,
      new CssMinimizerPlugin(),
      new TerserWebpackPlugin({
        parallel: threads
      }),
      // 压缩图片
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminGenerate,
          options: {
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              [
                "svgo",
                {
                  plugins: [
                    "preset-default",
                    "prefixIds",
                    {
                      name: "sortAttrs",
                      params: {
                        xmlnsOrder: "alphabetical",
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
    ],
    splitChunks: {
      // 两个作用
      // 1，对应多次引用到的node_modules里面的公共代码会被抽离出来一个单独的js
      // 2, 会对于动态import的文件抽离出来一个js 在需要用到的时候引入
      // 应用：router的按需加载
      chunks: "all",
    },
    runtimeChunk: {
      name: entrypoint => `runtime.${entrypoint.name}`
    }
  },
  mode: "production",
  devtool: 'source-map',
  // target: ['web', 'es5']
  // devServer: {
  //   host: 'localhost',
  //   port: '9527',
  //   open: true
  // }
}