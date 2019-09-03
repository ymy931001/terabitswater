var webpack = require('webpack');

module.exports = {
  //页面入口文件配置，这里是用gulp打包出来的app.js
  entry: {
    index: './build/app.js'
  },
  //入口文件输出配置，这里需要设置对app.js打包后得到的文件名称
  output: {
    path: './',
    filename: 'bundle.js'
  },
  module: {
    //加载器配置，这里使用es3ify-loader对app.js进行再次打包；
    loaders: [
      {
        test: /\.js?$/,
        loaders: ['es3ify-loader'],
      },
    ]
  },
};