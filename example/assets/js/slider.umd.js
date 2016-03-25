(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Slider"] = factory();
	else
		root["Slider"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _util = __webpack_require__(2);

	var _util2 = _interopRequireDefault(_util);

	var _dom = __webpack_require__(3);

	var _dom2 = _interopRequireDefault(_dom);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Slider = function () {

	  var VERSION = "0.2.0";

	  var supportedStyles = {
	    default: "style-flat",
	    flat: "style-flat",
	    cubic: "style-cubic"
	  };

	  var defaultConfig = {
	    hasDotNav: true,
	    hasArrowNav: true,
	    autoplay: true,
	    autoplayInterval: 3000,
	    aspectRatio: 8 / 5,
	    animationTime: 500,
	    swipeThresholdWidth: 0.2,
	    style: supportedStyles.default,
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

	  var ZINDEX = 50;

	  var Slider = function () {
	    _createClass(Slider, null, [{
	      key: "version",
	      get: function get() {
	        return VERSION;
	      }
	    }]);

	    function Slider(selector, config) {
	      _classCallCheck(this, Slider);

	      this.selector = selector;
	      this.config = Object.assign({}, defaultConfig, config);
	      this.validateConfig(this.config);

	      this.sliderDom = document.querySelector(selector);
	      this.slides = document.querySelectorAll(selector + ">div");

	      this.length = this.slides.length;
	      this.activeIndex = 0;
	      this.autoplayIndex = 0;
	      this.autoplaySlides;
	      this.translateX = !_util2.default.isIE(8) ? true : false;
	      this.touchstartX = 0;

	      this.buildDom();
	      this.setSliderSize();
	      this.addListeners();
	      this.setSlidesPosition(this.activeIndex);
	      this.autoplay();
	    }

	    _createClass(Slider, [{
	      key: "addListeners",
	      value: function addListeners() {
	        // arrow nav btn
	        Array.prototype.forEach.call(this.arrowNavBtn, function (ele, index) {
	          ele.addEventListener("click", function (e) {
	            clearInterval(this.autoplaySlides);
	            if (index === 0) {
	              this.slideToPrev();
	            } else if (index === 1) {
	              this.slideToNext();
	            }
	            e.preventDefault();
	          }.bind(this));
	        }.bind(this));

	        // dot nav btn
	        Array.prototype.forEach.call(this.dotNavBtn, function (ele, index) {
	          ele.addEventListener("click", function (e) {
	            clearInterval(this.autoplaySlides);
	            this.slideTo(index);
	            e.preventDefault();
	          }.bind(this));
	        }.bind(this));

	        // touch support
	        this.sliderWrap.addEventListener("touchstart", function (e) {
	          clearInterval(this.autoplaySlides);
	          this.handleTouch(e);
	        }.bind(this));
	        this.sliderWrap.addEventListener("touchmove", function (e) {
	          this.handleTouch(e);
	        }.bind(this));
	        this.sliderWrap.addEventListener("touchend", function (e) {
	          this.handleTouch(e);
	        }.bind(this));
	      }

	      // todo

	    }, {
	      key: "handleTouch",
	      value: function handleTouch(e) {
	        var touches = e.changedTouches,
	            x = touches[0].pageX,
	            y = touches[0].pageY,
	            s = this;

	        if (e.type === "touchstart") {
	          s.touchstartX = x;
	        }
	        if (e.type === "touchend") {
	          var dist = x - s.touchstartX;
	          if (dist > s.width * s.config.swipeThresholdWidth) {
	            if (s.activeIndex === 0) {
	              s.slideTo(s.activeIndex);
	            } else {
	              s.slideToPrev();
	            }
	          } else if (dist < -s.width * s.config.swipeThresholdWidth) {
	            if (s.activeIndex === s.length - 1) {
	              s.slideTo(s.activeIndex);
	            } else {
	              s.slideToNext();
	            }
	          } else {
	            s.slideTo(s.activeIndex);
	          }
	          s.touchstartX = 0;
	        }
	        if (e.type === "touchmove") {
	          for (var i = 0; i < s.length; i++) {
	            var left = (i - s.activeIndex) * s.width + (x - s.touchstartX);
	            s.setSlidePosition(i, left, false);
	          }
	        }
	      }
	    }, {
	      key: "validateConfig",
	      value: function validateConfig(config) {
	        var isStyleValid = false;

	        // style
	        for (var prop in supportedStyles) {
	          if (supportedStyles[prop] === config.style) {
	            isStyleValid = true;
	            break;
	          }
	        }
	        if (!isStyleValid) {
	          config.style = supportedStyles.default;
	        }

	        // todo: all the rest props
	      }
	    }, {
	      key: "buildDom",
	      value: function buildDom() {
	        var wrap = document.createElement("div");
	        var dotNav = document.createElement("nav");
	        var arrowNav = document.createElement("nav");

	        this.dotNav = dotNav;
	        this.arrowNav = arrowNav;
	        this.sliderWrap = wrap;

	        // prepare slides
	        wrap.className = classNames.wrap;
	        Array.prototype.forEach.call(this.slides, function (slide, index) {
	          slide.className += " " + classNames.slide;
	          wrap.appendChild(slide);
	        });
	        this.sliderDom.className += " " + classNames.container + " " + classNames.name + "-" + this.config.style;
	        this.sliderDom.appendChild(wrap);

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
	        this.dotNavLi = this.dotNav.querySelectorAll("li");
	        this.dotNavBtn = this.dotNav.querySelectorAll("a");

	        // arrow nav
	        if (this.config.hasArrowNav) {
	          arrowNav.innerHTML = "<ul><li class=" + classNames.prev + "><a href=\"#\"></a></li><li class=" + classNames.next + "><a href=\"#\"></a></li></ul>";
	          arrowNav.className = classNames.arrowNav;
	          this.sliderDom.appendChild(arrowNav);
	        }
	        this.arrowNavBtn = this.arrowNav.querySelectorAll("a");
	      }
	    }, {
	      key: "setSliderSize",
	      value: function setSliderSize() {
	        this.width = this.sliderDom.getBoundingClientRect().width;
	        this.height = this.width / this.config.aspectRatio;

	        (0, _dom2.default)(this.sliderWrap).width(this.width).height(this.height);
	        (0, _dom2.default)(this.slides).width(this.width).height(this.height);
	      }
	    }, {
	      key: "setSlidesPosition",
	      value: function setSlidesPosition(activeIndex) {
	        this.setActive(activeIndex);

	        Array.prototype.forEach.call(this.slides, function (ele, index) {
	          var offset = index - activeIndex;
	          var left;

	          if (this.config.infinite) {
	            if (offset < -1) {
	              offset = offset + this.length;
	            } else if (offset > this.length - 2) {
	              offset = offset - this.length;
	            }
	            left = offset * this.width;
	          } else {
	            left = offset * this.width;
	          }

	          this.setSlidePosition(index, left, offset, true);
	        }.bind(this));
	      }

	      // todo: z-index bug

	    }, {
	      key: "setSlidePosition",
	      value: function setSlidePosition(index, left, offset, isAnimated) {
	        var transition = isAnimated ? "all " + this.config.animationTime + "ms" : "all 0ms";

	        this.slides[index].style.transition = transition;

	        if (this.config.style === 'style-flat') {
	          var zIndex = ZINDEX - offset;
	          this.slides[index].style.zIndex = zIndex;
	          if (this.translateX) {
	            this.slides[index].style.transform = "translateX(" + left + "px)";
	          } else {
	            this.slides[index].style.left = left;
	          }
	        }

	        if (this.config.style === 'style-cubic') {
	          var _zIndex = ZINDEX - Math.abs(offset);
	          this.slides[index].style.zIndex = _zIndex;
	          if (offset === 0) {
	            this.slides[index].style.transform = "translateX(" + left + "px) scale(1.7,1.7)";
	          } else {
	            this.slides[index].style.transform = "translateX(" + left + "px) scale(1,1)";
	          }
	        }
	      }
	    }, {
	      key: "setActive",
	      value: function setActive(index) {
	        this.activeIndex = index;
	        (0, _dom2.default)(this.slides).removeClass(classNames.active).eq(index).addClass(classNames.active);
	        if (this.config.hasDotNav) {
	          (0, _dom2.default)(this.dotNavLi).removeClass(classNames.active).eq(index).addClass(classNames.active);
	        }
	      }
	    }, {
	      key: "slideTo",
	      value: function slideTo(index) {
	        if (index > this.length - 1) {
	          index = 0;
	        } else if (index < 0) {
	          index = this.length - 1;
	        }
	        this.setSlidesPosition(index);
	      }
	    }, {
	      key: "slideToNext",
	      value: function slideToNext() {
	        this.slideTo(this.activeIndex + 1);
	      }
	    }, {
	      key: "slideToPrev",
	      value: function slideToPrev() {
	        this.slideTo(this.activeIndex - 1);
	      }
	    }, {
	      key: "autoplay",
	      value: function autoplay() {
	        var s = this;
	        if (s.config.autoplay) {
	          s.autoplaySlides = setInterval(function () {
	            s.slideTo(s.autoplayIndex);
	            if (s.autoplayIndex === s.length - 1) {
	              s.autoplayIndex = 0;
	            } else {
	              s.autoplayIndex++;
	            }
	          }, s.config.autoplayInterval);
	        }
	      }
	    }]);

	    return Slider;
	  }();

	  return Slider;
	}();

	/*
	 * when using es2015 style of exporting, webpack put the output under default property, which is not what I want
	 * so as long as webpack keeping doing so, old-fashioned way of exporting is used
	 */

	// export default Slider
	module.exports = Slider;

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
	    immutable: function immutable(obj) {
	      var newObj = {};
	      for (var prop in obj) {
	        newObj[prop] = obj[prop];
	      }
	      return newObj;
	    }
	  };

	  return Util;
	}();

	exports.default = Util;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Dom = function () {

	  // todo: make all return dom array

	  var Dom = function () {
	    function Dom(selector) {
	      _classCallCheck(this, Dom);

	      this.selector = selector;
	      this.dom = selector;
	      this.init();
	    }

	    _createClass(Dom, [{
	      key: "init",
	      value: function init() {
	        if (typeof this.selector === "string") {
	          this.dom = document.querySelectorAll(this.selector);
	        }

	        return this;
	      }

	      // todo: there seems to be a better way of doing this

	    }, {
	      key: "_handleDomArray",
	      value: function _handleDomArray(handler, args) {
	        if (typeof this.dom.length !== "undefined") {
	          Array.prototype.forEach.call(this.dom, function (ele, i) {
	            handler.bind(null, ele).apply(null, args);
	          });
	          if (this.dom.length == 1) {
	            this.dom = this.dom[0];
	          }
	        } else {
	          handler.bind(null, this.dom).apply(null, args);
	        }
	      }
	    }, {
	      key: "removeClass",
	      value: function removeClass(className) {
	        var _removeEleClass = function _removeEleClass(ele, className) {
	          ele.className = ele.className.replace(className, "");
	        };

	        this._handleDomArray(_removeEleClass, arguments);

	        return this;
	      }
	    }, {
	      key: "addClass",
	      value: function addClass(className) {
	        var _addEleClass = function _addEleClass(ele, className) {
	          ele.className += " " + className;
	        };

	        this._handleDomArray(_addEleClass, arguments);

	        return this;
	      }
	    }, {
	      key: "eq",
	      value: function eq(index) {
	        // todo: add dom check
	        if (index < 0) {
	          index = index + this.dom.length;
	        }
	        this.dom = this.dom[index];

	        return this;
	      }
	    }, {
	      key: "find",
	      value: function find(selector) {
	        // todo: add dom check
	        this.dom = this.dom.querySelectorAll(selector);

	        return this;
	      }
	    }, {
	      key: "width",
	      value: function width(_width2) {
	        var _width = function _width(ele, width) {
	          // todo: add width check
	          ele.style.width = width + "px";
	        };
	        this._handleDomArray(_width, arguments);

	        return this;
	      }
	    }, {
	      key: "height",
	      value: function height(_height2) {
	        var _height = function _height(ele, width) {
	          // todo: add height check
	          ele.style.height = _height2 + "px";
	        };
	        this._handleDomArray(_height, arguments);

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
/******/ ])
});
;