const path = require('path')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "main.js",
    // 自动清空上次打包资源
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },

      {
        test: /\.less$/i,
        use: [
          // compiles Less to CSS
          'style-loader',
          'css-loader',
          'less-loader',
        ],
      },

      {
        test: /\.s[ac]ss$/i,
        use: [
          // 将 JS 字符串生成为 style 节点
          'style-loader',
          // 将 CSS 转化成 CommonJS 模块
          'css-loader',
          // 将 Sass 编译成 CSS
          'sass-loader',
        ],
      },

      {
        test: /\.styl$/,
        use: ['style-loader', 'css-loader', "stylus-loader"], // 将 Stylus 文件编译为 CSS
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
      }

    ]
  },
  plugins: [],
  mode: "development",
  // devtool: false
}