const { defineConfig } = require('@vue/cli-service')
// const path = require('path')
module.exports = defineConfig({
  transpileDependencies: true,
})


module.exports = {
  devServer: {
    proxy: {
      "/api": {
        // target: "",
        target: "http://localhost:5000",
        changeOrigin: true
      }
    }
  },
  // outputDir: path.resolve(''),
	// publicPath: process.env.NODE_ENV === 'production' ? 'true일때 ' : ''
}