module.exports = {
  presets: [
    [
      "@babel/preset-env",
      // 按需加载core-js的polyfill
      {
        "targets": {
          "browsers": ["last 2 versions", "ie 11"]
        },
        // targets: {
        //   chrome: '78', firefox: '60', ie: '11', safari: '17', edge: '17'
        // },
        useBuiltIns: "usage",
        corejs: { version: 3, proposals: true }

// ————————————————
// 版权声明：本文为CSDN博主「¡Venceremo」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
// 原文链接：https://blog.csdn.net/weixin_47295886/article/details/129736396
      },

    ],
  ],
}