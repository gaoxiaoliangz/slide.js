const Dom = (() => {

  // todo: make all return dom array
  class Dom {
    constructor(selector) {
      this.selector = selector
      this.dom = selector
      this.init()
    }

    init() {
      if(typeof this.selector === "string"){
        this.dom = document.querySelectorAll(this.selector)
      }

      return this
    }

    // todo: there seems to be a better way of doing this
    _handleDomArray(handler, args) {
      if(typeof this.dom.length !== "undefined"){
        Array.prototype.forEach.call(this.dom, (ele,i) => {
          handler.bind(null, ele).apply(null, args)
        })
        if(this.dom.length == 1){
          this.dom = this.dom[0]
        }
      }else{
        handler.bind(null, this.dom).apply(null, args)
      }
    }

    removeClass(className) {
      var _removeEleClass = function(ele, className) {
        ele.className = ele.className.replace(className, "")
      }

      this._handleDomArray(_removeEleClass, arguments)

      return this
    }

    addClass(className) {
      var _addEleClass = function(ele, className) {
        ele.className += ` ${className}`
      }

      this._handleDomArray(_addEleClass, arguments)

      return this
    }

    eq(index) {
      // todo: add dom check
      if(index < 0){
        index = index + this.dom.length
      }
      this.dom = this.dom[index]

      return this
    }

    find(selector) {
      // todo: add dom check
      this.dom = this.dom.querySelectorAll(selector)

      return this
    }

    width(width) {
      let _width = function(ele, width) {
        // todo: add width check
        ele.style.width = width + "px"
      }
      this._handleDomArray(_width, arguments)

      return this
    }

    height(height) {
      let _height = function(ele, height) {
        // todo: add height check
        ele.style.height = height + "px"
      }
      this._handleDomArray(_height, arguments)

      return this
    }

    left(left) {
      let _left = function(ele, left) {
        // todo: add height check
        ele.style.left = left + "px"
      }
      this._handleDomArray(_left, arguments)

      return this
    }

    right(right) {
      let _right = function(ele, right) {
        // todo: add height check
        ele.style.right = right + "px"
      }
      this._handleDomArray(_right, arguments)

      return this
    }

    setVerticalCenter() {
      let _setEleVerticalCenter = function(ele) {
        let height = ele.clientHeight
        ele.style.marginTop = -height/2 + "px"
        ele.style.top = "50%"
        ele.style.position = "absolute"
      }
      this._handleDomArray(_setEleVerticalCenter, arguments)

      return this
    }
  }

  function newDom(selector){
    return new Dom(selector)
  }

  return newDom
})()

module.exports = Dom
