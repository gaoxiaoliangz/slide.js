(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', './slider', './dom', './util'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, require('./slider'), require('./dom'), require('./util'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, global.slider, global.dom, global.util);
    global.pageFlip = mod.exports;
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
