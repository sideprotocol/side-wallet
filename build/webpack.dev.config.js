const webpack = require('webpack');

// for extension local test, can build each time
const config = {
  mode: 'development',
  devtool: 'inline-cheap-module-source-map',
  watch: true,
  // watchOptions: {
  //   ignored: ['**/public', '**/node_modules'],
  //   followSymlinks: false
  // },
  performance: {
    maxEntrypointSize: 2500000,
    maxAssetSize: 2500000
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.DEBUG': true,
      'process.env.TAILWIND_MODE': 'watch'
    })
  ]
};

module.exports = config;
