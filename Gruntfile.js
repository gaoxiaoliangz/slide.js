module.exports = function(grunt) {

  require("load-grunt-tasks")(grunt);
  var webpack = require("webpack");
  var webpackConfig = require("./webpack.config.js");

  grunt.loadNpmTasks('grunt-webpack');

  grunt.initConfig({
    babel: {
      es2015: {
        options: {
          sourceMap: true,
          presets: ['es2015']
        },
        files: {
        }
      }
    },
    webpack: {
      build: {
        entry: {
          slider: ['./src/js/slider']
        },
        output: {
          path: 'example/assets/js',
          filename: '[name].js'
        },
        module: webpackConfig.module,
        resolve: webpackConfig.resolve,
        plugins: [
          new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
          })
        ]
      }
    },
    uglify: {
      options: {
        sourceMap: false,
        mangle: true
      },
      target: {
        files: {
          'dist/js/slider.min.js': ['example/assets/js/slider.js']
        }
      }
    },
    sass: {
      dist: {
        options: {
          style: 'compressed',
          sourcemap: 'none'
        },
        files: {
          "dist/css/slider.min.css": "src/scss/slider.scss",
        }
      },
      dev: {
        options: {
          style: 'expened'
        },
        files: {
          "example/assets/css/style.css": "src/scss/style.scss",
          "example/assets/css/slider.css": "src/scss/slider.scss"
        }
      }
    },
    image: {
      dist: {
        files: [{
          expand: true,
          cwd: 'src/img',
          src: ['**/*.{png,jpg,gif,svg}'],
          dest: 'dist/img'
        }]
      },
      dev: {
        files: [{
          expand: true,
          cwd: 'src/img',
          src: ['**/*.{png,jpg,gif,svg}'],
          dest: 'example/assets/img'
        }]
      }
    },
    watch: {
      styles: {
        files: ['src/scss/*.scss'],
        tasks: ['sass'],
        options: {
          spawn: false
        },
      }
    }
  });

  grunt.registerTask("build", ["image","sass","webpack","uglify"]);
};
