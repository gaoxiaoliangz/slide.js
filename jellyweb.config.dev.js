const { resolveProject } = require('jellyweb')

module.exports = {
  entry: {
    main: resolveProject('src/index.js'),
  },
  output: {
    path: resolveProject('build'),
    filename: '[name].js',
    publicPath: '/',
    library: 'Slide',
    libraryTarget: 'umd',
    filename: 'slide.js',
  },
  devtool: 'sourcemap',
  features: {
    babel: true,
    define: {},
    css: true,
    sass: true,
    media: {
      dataUrl: true
    },
    production: false,
  }
}
