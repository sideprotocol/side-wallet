const webpack = require('webpack');

const config = {
  mode: 'production',
  devtool: false,
  performance: {
    maxEntrypointSize: 2500000,
    maxAssetSize: 2500000
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new webpack.DefinePlugin({})
  ]
};

module.exports = config;
