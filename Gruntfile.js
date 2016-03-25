module.exports = function(grunt) {

  require("load-grunt-tasks")(grunt);
  var webpack = require("webpack");
  var webpackConfig = require("./webpack.config.js");

  grunt.loadNpmTasks('grunt-webpack');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
        ' * Slider v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
        ' * Copyright 2015-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
        ' * Licensed under MIT\n' +
        ' */\n',
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
          path: 'dist/js',
          filename: '[name].umd.js',
          libraryTarget: 'umd',
          library: 'Slider'
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
        mangle: true,
        banner: '<%= banner %>'
      },
      target: {
        files: {
          'dist/js/slider.min.js': ['dist/js/slider.umd.js']
        }
      }
    },
    copy: {
      tar: {
        expand: true,
        cwd: 'dist',
        src: 'js/*',
        dest: 'example/assets',
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

  grunt.registerTask("build", ["image","sass","webpack","uglify","copy"]);
};
