// vue.config.js
module.exports = {
  outputDir: 'target/umktw',
  devServer: {
    port: '8080',
    open: true,
    proxy: {
      '/api': {
        target: 'http://umktwwebtest.ucarinc.com/',
        changeOrigin: true,
        pathRewrite: {
          '^/api/': '/api/'
        }
      }
    }
  }
}
