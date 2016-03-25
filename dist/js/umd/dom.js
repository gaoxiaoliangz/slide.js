(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["module"], factory);
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
