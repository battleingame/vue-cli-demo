// 导入compression-webpack-plugin
const CompressionWebpackPlugin = require('compression-webpack-plugin');
// 定义压缩文件类型
const productionGzipExtensions = ['js', 'css'];
const webpack = require('webpack')
module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({  //引入Jquery
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery':'jquery'
      }),
      new CompressionWebpackPlugin({
        filename: '[path].gzip[query]', // 提示compression-webpack-plugin@2.0.0的话filename改为asset
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240, //内容超过10KB进行压缩
        minRatio: 0.8
      })
    ],
  },
  devServer: {
    // host: 'localhost',
    // port: 8020,
    https: false,
    hotOnly: false,
    open: false,
    // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli/cli-service.md#配置代理
    proxy: {
      '/apiv1': {
        // target: 'http://192.168.0.104:8080',
        // target: 'http://47.93.123.202:7080',
        changeOrigin: true,
        pathRewrite: {
        }
      },
      '/apiv2': {
        // target: 'http://47.95.23.151:8130',
        changeOrigin: true,
        pathRewrite: {
          '^/apiv2': '/'
        }
      }
    }
  },
}