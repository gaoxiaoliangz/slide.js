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
    banner2: '/*!\n' +
        ' * SliderPageFlip v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
        ' * Copyright 2015-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
        ' * Licensed under MIT\n' +
        ' */\n',
    webpack: {
      options: {
        module: webpackConfig.module,
        resolve: webpackConfig.resolve,
        plugins: [
          new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
          })
        ],
        output: {
          path: 'dist/js/umd',
          filename: '[name].js',
          libraryTarget: 'umd'
        }
      },
      build1: {
        entry: {
          "slider": ['./src/js/modules/slider']
        },
        output: {
          library: 'Slider'
        }
      },
      build2: {
        entry: {
          "slider-pageflip": ['./src/js/modules/slider-pageflip']
        },
        output: {
          library: 'PageFlip'
        },
        externals: {
          "./slider": "Slider"
        },
      },
      build3: {
        entry: {
          "dom": ['./src/js/modules/dom']
        },
        output: {
          library: 'Dom'
        }
      },
      build4: {
        entry: {
          "util": ['./src/js/modules/util']
        },
        output: {
          library: 'Util'
        }
      }
    },
    uglify: {
      options: {
        sourceMap: false,
        mangle: true
      },
      target: {
        options: {
          banner: '<%= banner %>'
        },
        files: [{
          expand: true,
          cwd: "dist/js/umd",
          src: ["*.js","!dom.js","!util.js"],
          dest: "dist/js",
          ext: ".min.js"
        }]
      },
      target2: {
        options: {
          banner: '<%= banner2 %>'
        },
        files: {
          'dist/js/slider-pageflip.min.js': 'dist/js/umd/slider-pageflip.js'
        }
      }
    },
    copy: {
      target: {
        expand: true,
        cwd: 'dist',
        src: ['js/*','js/umd/*'],
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
  grunt.registerTask("build-js", ["webpack","uglify","copy"]);
};
