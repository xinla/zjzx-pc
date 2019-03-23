const path = require("path");
module.exports = {
  // 基本路径
  baseUrl: './',
  // 输出文件目录
  // externals: {
  //   'vue': 'Vue',
  //   'vue-router': 'VueRouter',
  //   'vuex': 'Vuex',
  //   'axios': 'axios'
  // }
  outputDir: 'dist',
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, "./src/styles/base.less")
      ]
    }
  }
}
