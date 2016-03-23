// var path = require("path");
//
// module.exports = {
//     entry: "./dev/js/main.js",
//     output: {
//         path: "assets/js",
//         filename: "index.js"
//     },
//     devtool: 'source-map',
//     module: {
//       loaders: [
//           { test: /\.css$/, loader: "style-loader!css-loader" }
//       ]
//     },
//     resolve: {
//       root: path.resolve(__dirname),
//       alias: {
//         lib: "assets/lib",
//         jQuery: "assets/lib/jquery/jquery.min.js"
//       },
//       extensions: ['', '.js', '.jsx']
//     },
// };



var path = require('path')
var webpack = require('webpack')
var hot = 'webpack-hot-middleware/client'

module.exports = {
  entry: {
    index: [hot, './src/js/slider']
  },
  output: {
    path: path.join(__dirname, 'public/debug/js'),
    filename: '[name].js',
    publicPath: '/debug/js/'
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
