var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.config')
var path = require('path')
var express = require('express')

var app = new express()
var port = 3000

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

app.use(express.static(path.join(__dirname, 'example')))

app.get("/slider", function(req, res) {
  res.sendFile(__dirname + '/example/slider.html')
})

app.get("/page-flip", function(req, res) {
  res.sendFile(__dirname + '/example/page-flip.html')
})

app.get("/test", function(req, res) {
  res.sendFile(__dirname + '/example/test.html')
})

app.get("/test2", function(req, res) {
  res.sendFile(__dirname + '/example/test2.html')
})

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
