(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module'], factory);
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
