const { resolveProject, presets } = require('jellyweb')

module.exports = {
  entry: {
    main: resolveProject('src/index.js'),
  },
  output: {
    path: resolveProject('build'),
    filename: '[name]-[hash:8].js',
    publicPath: '/',
    library: 'Slide',
    libraryTarget: 'umd',
    filename: 'slide.js',
  },
  features: Object.assign({}, presets.production, {
    babel: true,
    define: {},
    css: true,
    sass: true,
    media: {
      dataUrl: true
    },
    production: true,
    scopedClassName: '[hash:base64:8]'
  })
}
