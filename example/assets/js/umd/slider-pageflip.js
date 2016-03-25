(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("Slider"));
	else if(typeof define === 'function' && define.amd)
		define(["Slider"], factory);
	else if(typeof exports === 'object')
		exports["PageFlip"] = factory(require("Slider"));
	else
		root["PageFlip"] = factory(root["Slider"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
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

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, __webpack_require__(2), __webpack_require__(3), __webpack_require__(4)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(module, require('./slider'), require('./dom'), require('./util'));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod, global.slider, global.dom, global.util);
	    global.sliderPageflip = mod.exports;
	  }
	})(this, function (module, _slider, _dom, _util) {
	  'use strict';

	  var _slider2 = _interopRequireDefault(_slider);

	  var _dom2 = _interopRequireDefault(_dom);

	  var _util2 = _interopRequireDefault(_util);

	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : {
	      default: obj
	    };
	  }

	  function _classCallCheck(instance, Constructor) {
	    if (!(instance instanceof Constructor)) {
	      throw new TypeError("Cannot call a class as a function");
	    }
	  }

	  var _createClass = function () {
	    function defineProperties(target, props) {
	      for (var i = 0; i < props.length; i++) {
	        var descriptor = props[i];
	        descriptor.enumerable = descriptor.enumerable || false;
	        descriptor.configurable = true;
	        if ("value" in descriptor) descriptor.writable = true;
	        Object.defineProperty(target, descriptor.key, descriptor);
	      }
	    }

	    return function (Constructor, protoProps, staticProps) {
	      if (protoProps) defineProperties(Constructor.prototype, protoProps);
	      if (staticProps) defineProperties(Constructor, staticProps);
	      return Constructor;
	    };
	  }();

	  function _possibleConstructorReturn(self, call) {
	    if (!self) {
	      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	    }

	    return call && (typeof call === "object" || typeof call === "function") ? call : self;
	  }

	  function _inherits(subClass, superClass) {
	    if (typeof superClass !== "function" && superClass !== null) {
	      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	    }

	    subClass.prototype = Object.create(superClass && superClass.prototype, {
	      constructor: {
	        value: subClass,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	  }

	  var classNames = {
	    name: 'page-flip',
	    slide: 'page-flip-page',
	    wrap: 'page-flip-wrap',
	    active: 'active',
	    container: 'page-flip-container',
	    dotNav: 'page-flip-dot-nav',
	    arrowNav: 'page-flip-arrow-nav',
	    prev: 'page-flip-nav-prev',
	    next: 'page-flip-nav-next'
	  };

	  var ZINDEX = 50;

	  var scrollTimeArray = [];

	  var PageFlip = function () {
	    var PageFlip = function (_Slider) {
	      _inherits(PageFlip, _Slider);

	      function PageFlip(selector, config) {
	        _classCallCheck(this, PageFlip);

	        config.hasArrowNav = false;
	        config.autoplay = false;

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PageFlip).call(this, selector, config));

	        _this.rebuildDom();
	        _this.layoutElements();
	        _this.setSliderSize();
	        _this.addListeners2();
	        return _this;
	      }

	      _createClass(PageFlip, [{
	        key: 'addListeners2',
	        value: function addListeners2() {
	          window.addEventListener("resize", function () {
	            this.setSliderSize();
	          }.bind(this));
	          this._handleScrollEvents(this.handleFlipScroll);
	        }
	      }, {
	        key: 'handleFlipScroll',
	        value: function handleFlipScroll(direction) {
	          if (direction == "up") {
	            this.slideToPrev();
	          } else if (direction == "down") {
	            this.slideToNext();
	          }
	        }
	      }, {
	        key: '_handleScrollEvents',
	        value: function _handleScrollEvents(func) {
	          window.addEventListener('wheel', function (e) {
	            var time = new Date();
	            var deltaTime = void 0,
	                direction = void 0;

	            scrollTimeArray.push(time);
	            if (scrollTimeArray.length >= 2) {
	              deltaTime = scrollTimeArray[scrollTimeArray.length - 1] - scrollTimeArray[scrollTimeArray.length - 2];
	            } else {
	              deltaTime = 999;
	            }
	            if (deltaTime > 50 && Math.abs(e.deltaY) > 0) {
	              if (e.deltaY > 0) {
	                direction = "down";
	              } else {
	                direction = "up";
	              }
	              func.call(this, direction);
	            }
	          }.bind(this));
	        }
	      }, {
	        key: 'setSliderSize',
	        value: function setSliderSize() {
	          this.width = document.documentElement.clientWidth;
	          this.height = document.documentElement.clientHeight;

	          (0, _dom2.default)(this.sliderWrap).width(this.width).height(this.height);
	          (0, _dom2.default)(this.slides).width(this.width).height(this.height);
	          (0, _dom2.default)(document.body).width(this.width).height(this.height);
	        }
	      }, {
	        key: 'layoutElements',
	        value: function layoutElements() {
	          (0, _dom2.default)(this.dotNav).setVerticalCenter();
	        }
	      }, {
	        key: 'rebuildDom',
	        value: function rebuildDom() {
	          (0, _dom2.default)(this.sliderDom).addClass(classNames.container);
	        }
	      }, {
	        key: 'setSlidePosition',
	        value: function setSlidePosition(index, top, offset, isAnimated) {
	          var transition = isAnimated ? "all " + this.config.animationTime + "ms" : "all 0ms";

	          this.slides[index].style.transition = transition;

	          var zIndex = ZINDEX - offset;
	          this.slides[index].style.zIndex = zIndex;
	          if (this.translateX) {
	            this.slides[index].style.transform = "translateY(" + top + "px)";
	          } else {
	            this.slides[index].style.top = top;
	          }
	        }
	      }]);

	      return PageFlip;
	    }(_slider2.default);

	    return PageFlip;
	  }();

	  module.exports = PageFlip;
	});

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(module);
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod);
	    global.dom = mod.exports;
	  }
	})(this, function (module) {
	  "use strict";

	  function _classCallCheck(instance, Constructor) {
	    if (!(instance instanceof Constructor)) {
	      throw new TypeError("Cannot call a class as a function");
	    }
	  }

	  var _createClass = function () {
	    function defineProperties(target, props) {
	      for (var i = 0; i < props.length; i++) {
	        var descriptor = props[i];
	        descriptor.enumerable = descriptor.enumerable || false;
	        descriptor.configurable = true;
	        if ("value" in descriptor) descriptor.writable = true;
	        Object.defineProperty(target, descriptor.key, descriptor);
	      }
	    }

	    return function (Constructor, protoProps, staticProps) {
	      if (protoProps) defineProperties(Constructor.prototype, protoProps);
	      if (staticProps) defineProperties(Constructor, staticProps);
	      return Constructor;
	    };
	  }();

	  var Dom = function () {
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
	          var _height = function _height(ele, height) {
	            // todo: add height check
	            ele.style.height = height + "px";
	          };
	          this._handleDomArray(_height, arguments);

	          return this;
	        }
	      }, {
	        key: "left",
	        value: function left(_left2) {
	          var _left = function _left(ele, left) {
	            // todo: add height check
	            ele.style.left = left + "px";
	          };
	          this._handleDomArray(_left, arguments);

	          return this;
	        }
	      }, {
	        key: "right",
	        value: function right(_right2) {
	          var _right = function _right(ele, right) {
	            // todo: add height check
	            ele.style.right = right + "px";
	          };
	          this._handleDomArray(_right, arguments);

	          return this;
	        }
	      }, {
	        key: "setVerticalCenter",
	        value: function setVerticalCenter() {
	          var _setEleVerticalCenter = function _setEleVerticalCenter(ele) {
	            var height = ele.clientHeight;
	            ele.style.marginTop = -height / 2 + "px";
	            ele.style.top = "50%";
	            ele.style.position = "absolute";
	          };
	          this._handleDomArray(_setEleVerticalCenter, arguments);

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

	  module.exports = Dom;
	});

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(module);
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod);
	    global.util = mod.exports;
	  }
	})(this, function (module) {
	  'use strict';

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

	  module.exports = Util;
	});

/***/ }
/******/ ])
});
;