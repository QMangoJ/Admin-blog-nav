module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/nav-vue/'
    : '/',
  devServer: {
    // open: true,
    proxy: {
      '': {
        target: 'http://127.0.0.1:7001',
      },
    },
  },
};
