import Util from "./util"
import _D from "./dom"
import './slide.scss'

const Slide = (() => {

  const VERSION = "0.2.0"

  const supportedStyles = {
    default: "style-flat",
    flat: "style-flat",
    cubic: "style-cubic"
  }

  const defaultConfig = {
    hasDotNav: true,
    hasArrowNav: true,
    autoplay: true,
    autoplayInterval: 3000,
    aspectRatio: 8/5,
    animationTime: 500,
    swipeThresholdWidth: 0.2,
    style: supportedStyles.default,
    infinite: false
  }

  const classNames = {
    name: 'slide',
    slide: 'slide-slide',
    wrap: 'slide-wrap',
    active: 'active',
    container: 'slide-container',
    prevSlide: 'slide-slide-prev',
    nextSlide: 'slide-slide-next',
    dotNav: 'slide-dot-nav',
    arrowNav: 'slide-arrow-nav',
    prev: 'slide-nav-prev',
    next: 'slide-nav-next',
  }

  const ZINDEX = 50

  class Slide {

    static get version() {
      return VERSION
    }

    constructor(selector, config) {
      this.selector = selector
      this.config = Object.assign({}, defaultConfig, config)
      this.validateConfig(this.config)

      this.slideDom = document.querySelector(selector)
      this.slides = document.querySelectorAll(`${selector}>div`)

      this.length = this.slides.length;
      this.activeIndex = 0;
      this.autoplayIndex = 0;
      this.autoplaySlides;
      this.translateX = (!Util.isIE(8)?true:false);
      this.touchstartX = 0;

      this.buildDom()
      this.setSlideSize()
      this.addListeners()
      this.setSlidesPosition(this.activeIndex)
      this.autoplay()
    }

    addListeners(){
      // arrow nav btn
      Array.prototype.forEach.call(this.arrowNavBtn, function(ele, index) {
        ele.addEventListener("click", function(e){
          clearInterval(this.autoplaySlides)
          if(index === 0){
            this.slideToPrev()
          } else if(index === 1){
            this.slideToNext()
          }
          e.preventDefault()
        }.bind(this))
      }.bind(this))

      // dot nav btn
      Array.prototype.forEach.call(this.dotNavBtn, function(ele, index) {
        ele.addEventListener("click", function(e){
          clearInterval(this.autoplaySlides)
          this.slideTo(index)
          e.preventDefault()
        }.bind(this))
      }.bind(this))

      // touch support
      this.slideWrap.addEventListener("touchstart", function(e){
        clearInterval(this.autoplaySlides)
        this.handleTouch(e)
      }.bind(this))
      this.slideWrap.addEventListener("touchmove", function(e){
        this.handleTouch(e)
      }.bind(this))
      this.slideWrap.addEventListener("touchend", function(e){
        this.handleTouch(e)
      }.bind(this))
    }

    // todo
    handleTouch(e) {
      var touches = e.changedTouches,
          x = touches[0].pageX,
          y = touches[0].pageY,
          s = this

      if(e.type === "touchstart"){
        s.touchstartX = x;
      }
      if(e.type === "touchend"){
        var dist = x - s.touchstartX;
        if(dist > s.width*s.config.swipeThresholdWidth){
          if(s.activeIndex === 0){
            s.slideTo(s.activeIndex);
          }else{
            s.slideToPrev();
          }
        }else if(dist < -s.width*s.config.swipeThresholdWidth){
          if(s.activeIndex === s.length-1){
            s.slideTo(s.activeIndex);
          }else{
            s.slideToNext();
          }
        }else{
          s.slideTo(s.activeIndex);
        }
        s.touchstartX = 0;
      }
      if(e.type === "touchmove"){
        for(var i = 0;i < s.length;i++){
          let left = (i-s.activeIndex)*s.width+(x-s.touchstartX);
          s.setSlidePosition(i, left, false);
        }
      }
    }

    validateConfig(config) {
      let isStyleValid = false

      // style
      for(var prop in supportedStyles) {
        if(supportedStyles[prop] === config.style) {
          isStyleValid = true
          break
        }
      }
      if(!isStyleValid) {
        config.style = supportedStyles.default
      }

      // todo: all the rest props
    }

    buildDom() {
      var wrap = document.createElement("div")
      var dotNav = document.createElement("nav")
      var arrowNav = document.createElement("nav")

      this.dotNav = dotNav
      this.arrowNav = arrowNav
      this.slideWrap = wrap

      // prepare slides
      wrap.className = classNames.wrap
      Array.prototype.forEach.call(this.slides, (slide, index)=> {
        slide.className += ` ${classNames.slide}`
        wrap.appendChild(slide)
      })
      this.slideDom.className += ` ${classNames.container} ${classNames.name}-${this.config.style}`
      this.slideDom.appendChild(wrap)

      // dot nav
      if(this.config.hasDotNav){
        dotNav.className += ` ${classNames.dotNav}`
        dotNav.innerHTML = "<ul></ul>"
        this.slideDom.appendChild(dotNav)

        for(let i = 0;i < this.length;i++){
          let dotNavLi = document.createElement("li")
          dotNavLi.innerHTML = "<a href='#'></a>"
          dotNav.querySelector("ul").appendChild(dotNavLi)
        }
      }
      this.dotNavLi = this.dotNav.querySelectorAll("li")
      this.dotNavBtn = this.dotNav.querySelectorAll("a")

      // arrow nav
      if(this.config.hasArrowNav){
        arrowNav.innerHTML = `<ul><li class=${classNames.prev}><a href="#"></a></li><li class=${classNames.next}><a href="#"></a></li></ul>`
        arrowNav.className = classNames.arrowNav
        this.slideDom.appendChild(arrowNav)
      }
      this.arrowNavBtn = this.arrowNav.querySelectorAll("a")
    }

    setSlideSize() {
      this.width = this.slideDom.getBoundingClientRect().width
      this.height = this.width/this.config.aspectRatio

      _D(this.slideWrap).width(this.width).height(this.height)
      _D(this.slides).width(this.width).height(this.height)
    }

    setSlidesPosition(activeIndex) {
      this.setActive(activeIndex)

      Array.prototype.forEach.call(this.slides, function(ele,index){
        let offset = index - activeIndex
        var left

        if(this.config.infinite){
          if(offset < -1){
            offset = offset + this.length
          }else if(offset > this.length-2){
            offset = offset - this.length
          }
          left = offset * this.width
        }else{
          left = offset * this.width
        }

        this.setSlidePosition(index, left, offset, true);
      }.bind(this))
    }

    // todo: z-index bug
    setSlidePosition(index, left, offset, isAnimated) {
      var transition = isAnimated?"all "+this.config.animationTime+"ms":"all 0ms"

      this.slides[index].style.transition = transition

      if(this.config.style === 'style-flat'){
        let zIndex = ZINDEX - offset
        this.slides[index].style.zIndex = zIndex
        if(this.translateX) {
          this.slides[index].style.transform = "translateX("+left+"px)"
        }else{
          this.slides[index].style.left = left
        }
      }

      if(this.config.style === 'style-cubic') {
        let zIndex = ZINDEX - Math.abs(offset)
        this.slides[index].style.zIndex = zIndex
        if(offset === 0){
          this.slides[index].style.transform = "translateX("+left+"px) scale(1.7,1.7)"
        }else{
          this.slides[index].style.transform = "translateX("+left+"px) scale(1,1)"
        }
      }
    }

    setActive(index) {
      this.activeIndex = index
      _D(this.slides).removeClass(classNames.active).eq(index).addClass(classNames.active)
      if(this.config.hasDotNav) {
        _D(this.dotNavLi).removeClass(classNames.active).eq(index).addClass(classNames.active)
      }
    }

    slideTo(index) {
      if(index > this.length-1){
        index = 0;
      }else if(index < 0){
        index = this.length-1;
      }
      this.setSlidesPosition(index)
    }

    slideToNext() {
      this.slideTo(this.activeIndex+1)
    }

    slideToPrev() {
      this.slideTo(this.activeIndex-1)
    }

    autoplay() {
      var s = this;
      if(s.config.autoplay){
        s.autoplaySlides = setInterval(function(){
          s.slideTo(s.autoplayIndex);
          if(s.autoplayIndex === s.length-1){
            s.autoplayIndex = 0;
          }else{
            s.autoplayIndex++;
          }
        },s.config.autoplayInterval);
      }
    }
  }

  return Slide
})()

export default Slide
