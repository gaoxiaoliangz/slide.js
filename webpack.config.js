var path = require('path')
var webpack = require('webpack')
var hot = 'webpack-hot-middleware/client'

module.exports = {
  entry: {
    index: ['./src/js/index']
  },
  output: {
    path: path.join(__dirname, 'example/assets/js'),
    filename: '[name].js',
    publicPath: '/assets/js/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      },
      {
        test: /\.css?$/,
        loaders: [ 'style', 'raw' ]
      }
    ]
  },
  resolve: {
    root: path.resolve('./modules'),
    alias: {
      lib: path.join(__dirname, "public/lib"),
      css: path.join(__dirname, "public/debug/css")
    },
    extensions: ['', '.js']
  }
};
