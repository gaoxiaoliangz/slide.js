var path = require("path");

module.exports = {
    entry: "./dev/js/main.js",
    output: {
        path: "assets/js",
        filename: "index.js"
    },
    devtool: 'source-map',
    module: {
      loaders: [
          { test: /\.css$/, loader: "style-loader!css-loader" }
      ]
    },
    resolve: {
      root: path.resolve(__dirname),
      alias: {
        lib: "assets/lib",
        jQuery: "assets/lib/jquery/jquery.min.js"
      },
      extensions: ['', '.js', '.jsx']
    },
};
