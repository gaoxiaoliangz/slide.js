import Util from "./util"
import _D from "./dom"

const Slider = (() => {

  const defaultConfig = {
    hasDotNav: true,
    hasArrowNav: true,
    autoplay: true,
    autoplayInterval: 4000,
    aspectRatio: 8/5,
    animationTime: 500,
    swipeThresholdWidth: 0.2,
    style: 'style-flat', // flat | cubic
    infinite: false
  }

  const classNames = {
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
    next: 'slider-nav-next',
  }

  class Slider {
    constructor(selector, config) {
      this.config = defaultConfig
      this.selector = selector

      this.sliderDom = document.querySelector(selector)
      this.slides = document.querySelectorAll(`${selector}>div`)

      this.length = this.slides.length;
      this.activeIndex = 0;
      this.autoplayIndex = 0;
      this.autoplaySlides;
      this.translateX = (!Util.isIE(8)?true:false);
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

      this.config = Object.assign(defaultConfig, config)

      this.buildDom()
      this.addListeners()

    }

    addListeners(){
      var _this = this

      Array.prototype.forEach.call(this.arrowNavLi, (ele, index) => {
        ele.addEventListener("click", function(){
          if(index === 0){
            _this.slideToPrev()
          } else if(index === 1){
            _this.slideToNext()
          }
          return false
        })
      })

      Array.prototype.forEach.call(this.dotNavLi, (ele, index) => {
        ele.addEventListener("click", function(){
          _this.slideTo(index)
          return false
        })
      })
    }

    buildDom() {
      var wrap = document.createElement("div")
      var dotNav = document.createElement("nav")
      var arrowNav = document.createElement("nav")

      this.dotNav = dotNav
      this.arrowNav = arrowNav
      this.sliderWrap = wrap


      // prepare slides
      wrap.className = classNames.wrap
      Array.prototype.forEach.call(this.slides, (slide, index)=> {
        if(this.activeIndex === index){
          slide.className += ` ${classNames.active}`
        }
        slide.className += ` ${classNames.slide}`
        wrap.appendChild(slide)
      })
      this.sliderDom.className += ` ${classNames.container} ${classNames.name}-${this.config.style}`
      this.sliderDom.appendChild(wrap)

      this.setSliderStyle()


      // dot nav
      if(this.config.hasDotNav){
        dotNav.className += ` ${classNames.dotNav}`
        dotNav.innerHTML = "<ul></ul>"
        this.sliderDom.appendChild(dotNav)

        for(let i = 0;i < this.length;i++){
          let dotNavLi = document.createElement("li")
          dotNavLi.innerHTML = "<a href='#'></a>"
          dotNav.querySelector("ul").appendChild(dotNavLi)
        }
      }
      this.dotNavLi = this.dotNav.querySelectorAll("li")

      // arrow nav
      if(this.config.hasArrowNav){
        arrowNav.innerHTML = `<ul><li class=${classNames.prev}><a href="#"></a></li><li class=${classNames.next}><a href="#"></a></li></ul>`
        arrowNav.className = classNames.arrowNav
        this.sliderDom.appendChild(arrowNav)
      }
      this.arrowNavLi = this.arrowNav.querySelectorAll("li")
    }

    setSliderStyle() {
      this.width = this.sliderDom.getBoundingClientRect().width
      this.height = this.width/this.config.aspectRatio
      this.sliderWrap.style.width = this.width+"px"
      this.sliderWrap.style.height = this.height+"px"
      this.setSlidesPosition(this.activeIndex)

      // $slides.removeClass(s.classNames.prevSlide).eq(s.activeIndex-1).addClass(s.classNames.prevSlide)
      // $slides.removeClass(s.classNames.nextSlide).eq(s.activeIndex+1).addClass(s.classNames.nextSlide)
    }


    // todo: opt
    setSlidesPosition(activeIndex) {
      var s = this
      var k
      var left
      if(s.config.infinite){
        for(var i = 0;i < s.length;i++){
          left = (i-1)*s.width
          k = activeIndex + i - 1;
          if(k>s.length-1){
            k = k - s.length
          }
          s.setSlidePosition(k, left, true);
        }
      }else{
        for(var i = 0;i < s.length;i++){
          left = (i-activeIndex)*s.width
          s.setSlidePosition(i, left, true);
        }
      }
    }

    setSlidePosition(index, left, isAnimated) {
      var transition = isAnimated?"all "+this.config.animationTime+"ms":"all 0ms"

      this.slides[index].style.transition = transition

      if(this.config.style === 'style-flat'){
        if(this.translateX) {
          this.slides[index].style.transform = "translateX("+left+"px)"
        }else{
          this.slides[index].style.left = left
        }
      }

      if(this.config.style === 'style-cubic') {
        if(this.activeIndex === index){
          this.slides[index].style.transform = "translateX("+left+"px) scale(1.7,1.7)"
        }else{
          this.slides[index].style.transform = "translateX("+left+"px) scale(1,1)"
        }
      }
    }


    slideTo(index) {
      var s = this;

      if(index > s.length-1){
        index = 0;
      }else if(index < 0){
        index = s.length-1;
      }

      s.activeIndex = index;


      // $slides.removeClass("active").eq(index).addClass("active");
      // $slides.removeClass(s.classNames.prevSlide).eq(index-1).addClass(s.classNames.prevSlide);
      // $slides.removeClass(s.classNames.nextSlide).eq(index+1).addClass(s.classNames.nextSlide);


      if(s.config.hasDotNav){
        _D(s.dotNavLi).removeClass("active")
        _D(s.dotNavLi[index]).addClass("active")
      }
      s.setSlidesPosition(index);

    }

    slideToNext() {
      this.slideTo(this.activeIndex+1);
    }

    slideToPrev(){
      this.slideTo(this.activeIndex-1);
    }
  }

  return Slider
})()

export default Slider
