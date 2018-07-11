import Slide from './slide'
import _D from './dom'

const classNames = {
  name: 'page-flip',
  slide: 'page-flip-page',
  wrap: 'page-flip-wrap',
  active: 'active',
  container: 'page-flip-container',
  dotNav: 'page-flip-dot-nav',
  arrowNav: 'page-flip-arrow-nav',
  prev: 'page-flip-nav-prev',
  next: 'page-flip-nav-next',
}

const ZINDEX = 50

let scrollTimeArray = []

const PageFlip = (() => {

  class PageFlip extends Slide {
    constructor(selector, config){
      config.hasArrowNav = false
      config.autoplay = false

      super(selector, config)

      this.rebuildDom()
      this.layoutElements()
      this.setSlideSize()
      this.addListeners2()
    }

    addListeners2() {
      window.addEventListener("resize", function() {
        this.setSlideSize()
      }.bind(this))
      this._handleScrollEvents(this.handleFlipScroll)
    }

    handleFlipScroll(direction) {
      if(direction == "up"){
        this.slideToPrev()
      }else if(direction == "down"){
        this.slideToNext()
      }
    }

    _handleScrollEvents(func) {
      window.addEventListener('wheel', function(e) {
        let time = new Date()
        let deltaTime, direction

        scrollTimeArray.push(time)
        if(scrollTimeArray.length>=2) {
          deltaTime = scrollTimeArray[scrollTimeArray.length-1] - scrollTimeArray[scrollTimeArray.length-2]
        }else{
          deltaTime = 999
        }
        if(deltaTime > 50 && Math.abs(e.deltaY)>0) {
          if(e.deltaY > 0) {
            direction = "down"
          }else{
            direction = "up"
          }
          func.call(this, direction)
        }
      }.bind(this))
    }

    setSlideSize() {
      this.width = document.documentElement.clientWidth
      this.height = document.documentElement.clientHeight

      _D(this.slideWrap).width(this.width).height(this.height)
      _D(this.slides).width(this.width).height(this.height)
      _D(document.body).width(this.width).height(this.height)
    }

    layoutElements() {
      _D(this.dotNav).setVerticalCenter()
    }

    rebuildDom() {
      _D(this.slideDom).addClass(classNames.container)
    }

    setSlidePosition(index, top, offset, isAnimated) {
      var transition = isAnimated?"all "+this.config.animationTime+"ms":"all 0ms"

      this.slides[index].style.transition = transition

      let zIndex = ZINDEX - offset
      this.slides[index].style.zIndex = zIndex
      if(this.translateX) {
        this.slides[index].style.transform = "translateY("+top+"px)"
      }else{
        this.slides[index].style.top = top
      }

    }
  }

  return PageFlip
})()

module.exports = PageFlip
