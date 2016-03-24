/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _util = __webpack_require__(2);

	var _util2 = _interopRequireDefault(_util);

	var _dom = __webpack_require__(3);

	var _dom2 = _interopRequireDefault(_dom);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Slider = function () {

	  var defaultConfig = {
	    hasDotNav: true,
	    hasArrowNav: true,
	    autoplay: true,
	    autoplayInterval: 4000,
	    aspectRatio: 8 / 5,
	    animationTime: 500,
	    swipeThresholdWidth: 0.2,
	    style: 'style-flat', // flat | cubic
	    infinite: false
	  };

	  var classNames = {
	    name: 'slider',
	    slide: 'slider-slide',
	    wrap: 'slider-wrap',
	    active: 'active',
	    container: 'slider-container',
	    prevSlide: 'slider-slide-prev',
	    nextSlide: 'slider-slide-next',
	    dotNav: 'slider-dot-nav',
	    arrowNav: 'slider-arrow-nav',
	    prev: 'slider-nav-prev',
	    next: 'slider-nav-next'
	  };

	  var Slider = function () {
	    function Slider(selector, config) {
	      _classCallCheck(this, Slider);

	      this.config = defaultConfig;
	      this.selector = selector;

	      this.sliderDom = document.querySelector(selector);
	      this.slides = document.querySelectorAll(selector + ">div");

	      this.length = this.slides.length;
	      this.activeIndex = 0;
	      this.autoplayIndex = 0;
	      this.autoplaySlides;
	      this.translateX = !_util2.default.isIE(8) ? true : false;
	      this.touchstartX = 0;

	      // todo: use es6 object extend
	      // for(option in config){
	      //   if(option === 'style'){
	      //     console.log(typeof config[option])
	      //     if(['flat','cubic'].indexOf(config[option]) === -1){
	      //       console.error('Style undefined, default style will be applied')
	      //       continue
	      //     }
	      //   }
	      //   defaultConfig[option] = config[option];
	      // }
	      this.buildDom();

	      this.arrowNav.addEventListener("click", function () {
	        console.log(12121212);
	      });
	    }

	    _createClass(Slider, [{
	      key: "buildDom",
	      value: function buildDom() {
	        var _this = this;

	        var wrap = document.createElement("div");
	        var dotNav = document.createElement("nav");
	        var arrowNav = document.createElement("nav");

	        this.dotNav = dotNav;
	        this.arrowNav = arrowNav;
	        this.sliderWrap = wrap;

	        // prepare slides
	        wrap.className = classNames.wrap;
	        Array.prototype.forEach.call(this.slides, function (slide, index) {
	          if (_this.activeIndex === index) {
	            slide.className += " " + classNames.active;
	          }
	          slide.className += " " + classNames.slide;
	          wrap.appendChild(slide);
	        });
	        this.sliderDom.className += " " + classNames.container + " " + classNames.name + "-" + this.config.style;
	        this.sliderDom.appendChild(wrap);

	        this.setSliderStyle();

	        // dot nav
	        if (this.config.hasDotNav) {
	          dotNav.className += " " + classNames.dotNav;
	          dotNav.innerHTML = "<ul></ul>";
	          this.sliderDom.appendChild(dotNav);

	          for (var i = 0; i < this.length; i++) {
	            var dotNavLi = document.createElement("li");
	            dotNavLi.innerHTML = "<a href='#'></a>";
	            dotNav.querySelector("ul").appendChild(dotNavLi);
	          }
	        }

	        // arrow nav
	        if (this.config.hasArrowNav) {
	          arrowNav.innerHTML = "<ul><li class=" + classNames.prev + "><a href=\"#\"></a></li><li class=" + classNames.next + "><a href=\"#\"></a></li></ul>";
	          arrowNav.className = classNames.arrowNav;
	          this.sliderDom.appendChild(arrowNav);
	        }
	      }
	    }, {
	      key: "setSliderStyle",
	      value: function setSliderStyle() {
	        this.width = this.sliderDom.getBoundingClientRect().width;
	        this.height = this.width / this.config.aspectRatio;
	        this.sliderWrap.style.width = this.width + "px";
	        this.sliderWrap.style.height = this.height + "px";
	        this.setSlidesPosition(this.activeIndex);

	        // console.log(_D);

	        // var test = new _D(`.${classNames.wrap}>div`)
	        // console.log(`${classNames.wrap}>div`)
	        // var test = new _D("abc")
	        // console.log(test.removeClass("slider-slide"))

	        // console.log(_D(`.${classNames.wrap}>div`).removeClass("slider-slide"));

	        // console.log(_D(document.body).addClass("fuck"));
	        // console.log(_D("body"));

	        // this.slides.removeClass("123")

	        // (new _D(`${classNames.wrap}>div`)).removeClass("slider-slide")

	        // class A {
	        //   constructor(a){
	        //     this.a = a
	        //     // return a
	        //     this.test()
	        //   }
	        //   test(){
	        //     console.log(this.a)
	        //     return "fuck"
	        //   }
	        // }
	        //
	        // function newA(a){
	        //   return (new A(a)).test()
	        // }
	        //
	        //
	        // console.log(newA("jfiej"));
	        // var a = new A("body")
	        // console.log(a);
	        // a.test()
	        // console.log(a.test());

	        // _D(this.slides).removeClass(classNames.nextSlide)[this.activeIndex+1].addClass(classNames.nextSlide)
	        // className += ` ${classNames.nextSlide}`

	        console.log((0, _dom2.default)(this.slides));

	        // Util.removeClass(this.slides, classNames.prevSlide)[this.activeIndex-1].className += ` ${classNames.prevSlide}`
	        // Util.removeClass(this.slides, classNames.nextSlide)[this.activeIndex+1].className += ` ${classNames.nextSlide}`
	        // $slides.removeClass(s.classNames.prevSlide).eq(s.activeIndex-1).addClass(s.classNames.prevSlide)
	        // $slides.removeClass(s.classNames.nextSlide).eq(s.activeIndex+1).addClass(s.classNames.nextSlide)
	      }

	      // todo: opt

	    }, {
	      key: "setSlidesPosition",
	      value: function setSlidesPosition(activeIndex) {
	        var s = this;
	        var k;
	        var left;
	        if (s.config.infinite) {
	          for (var i = 0; i < s.length; i++) {
	            left = (i - 1) * s.width;
	            k = activeIndex + i - 1;
	            if (k > s.length - 1) {
	              k = k - s.length;
	            }
	            s.setSlidePosition(k, left, true);
	          }
	        } else {
	          for (var i = 0; i < s.length; i++) {
	            left = (i - activeIndex) * s.width;
	            s.setSlidePosition(i, left, true);
	          }
	        }
	      }
	    }, {
	      key: "setSlidePosition",
	      value: function setSlidePosition(index, left, isAnimated) {
	        var transition = isAnimated ? "all " + this.config.animationTime + "ms" : "all 0ms";

	        this.slides[index].style.transition = transition;

	        if (this.config.style === 'style-flat') {
	          if (this.translateX) {
	            this.slides[index].style.transform = "translateX(" + left + "px)";
	          } else {
	            this.slides[index].style.left = left;
	          }
	        }

	        if (this.config.style === 'style-cubic') {
	          if (this.activeIndex === index) {
	            this.slides[index].style.transform = "translateX(" + left + "px) scale(1.7,1.7)";
	          } else {
	            this.slides[index].style.transform = "translateX(" + left + "px) scale(1,1)";
	          }
	        }
	      }
	    }, {
	      key: "slideTo",
	      value: function slideTo(index) {
	        var s = this;

	        if (index > s.length - 1) {
	          index = 0;
	        } else if (index < 0) {
	          index = s.length - 1;
	        }

	        s.activeIndex = index;

	        // $slides.removeClass("active").eq(index).addClass("active");
	        // $slides.removeClass(s.classNames.prevSlide).eq(index-1).addClass(s.classNames.prevSlide);
	        // $slides.removeClass(s.classNames.nextSlide).eq(index+1).addClass(s.classNames.nextSlide);

	        if (s.config.hasDotNav) {
	          $slider.find(".dot-nav li").removeClass("active").eq(index).addClass("active");
	        }
	        s.setSlidesPosition(index);
	      }
	    }]);

	    return Slider;
	  }();

	  return Slider;
	}();

	exports.default = Slider;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var Util = function () {

	  var Util = {
	    isIE: function isIE(ver) {
	      var b = document.createElement('b');
	      b.innerHTML = '<!--[if IE ' + ver + ']><i></i><![endif]-->';
	      return b.getElementsByTagName('i').length === 1;
	    },
	    lockScroll: function lockScroll() {
	      document.body.style.overflow = "hidden";
	    },
	    unlockScroll: function unlockScroll() {
	      document.body.style.overflow = "auto";
	    },
	    removeClass: function removeClass(dom, classToRemove) {

	      var _removeEleClass = function _removeEleClass(ele) {
	        var classNames = ele.className.replace(classToRemove, "");
	        ele.className = classNames;
	      };

	      if (dom.length >= 1) {
	        Array.prototype.forEach.call(dom, function (e, i) {
	          _removeEleClass(e);
	        });
	      } else {
	        _removeEleClass(dom);
	      }

	      return dom;
	    }
	  };

	  return Util;
	}();

	exports.default = Util;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _util = __webpack_require__(2);

	var _util2 = _interopRequireDefault(_util);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Dom = function () {
	  var Dom = function () {
	    function Dom(selector) {
	      _classCallCheck(this, Dom);

	      this.selector = selector;
	      this.dom = selector;

	      if (typeof this.selector === "string") {
	        this.dom = document.querySelector(this.selector);
	      }
	    }

	    _createClass(Dom, [{
	      key: "init",
	      value: function init() {
	        return this;
	      }
	    }, {
	      key: "removeClass",
	      value: function removeClass(classToRemove) {
	        _util2.default.removeClass(this.dom, classToRemove);
	        return this;
	      }
	    }, {
	      key: "addClass",
	      value: function addClass(className) {
	        this.dom.className += " " + className;
	        return this;
	      }
	    }]);

	    return Dom;
	  }();

	  function newDom(selector) {
	    return new Dom(selector);
	  }

	  return newDom;
	}();

	exports.default = Dom;

/***/ }
/******/ ]);