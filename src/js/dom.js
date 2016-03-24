const Dom = (() => {

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
  }

  function newDom(selector){
    return new Dom(selector)
  }

  return newDom
})()

export default Dom
