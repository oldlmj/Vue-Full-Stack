module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/Vue-Ecommerce/'
    : '/',
  devServer: {
    proxy: {
      // 設置代理
      '/api': {
        target: 'http://127.0.0.1:8888', //請求的目標(後端)服務端接口
        changeOrigin: true, // 在本機會創建一個虛擬服務端，然後發送請求時，並同時接收請求的數據，這樣的服務端和服務端進行數據的交互就不會有跨域問題
        pathRewrite: {
          // 重寫請求
          '^/api': '/api', // 替換 target 中的請求地址，也就是說在http://127.0.0.1:8888/XXXXX 這個地址的時候直接寫成/api即可
        },
      },
    },
    host: '127.0.0.1',
    port: 8080,
  },
}

