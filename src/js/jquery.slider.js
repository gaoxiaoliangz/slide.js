/* slider.js v0.2.0, (c) 2016 Gao Liang. - https://github.com/gaoxiaoliangz/slider
 * @license MIT */

;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else if (typeof jQuery === "undefined"){
    console.error("Error:", "jQuery is needed to run Slider!");
  }else {
    root.Slider = factory(root);
  }
})(this, function(root) {
  var version = "0.1.0";
  var Slider = function(selector, config){
    return new Slider.prototype.init(selector, config);
  }

  Slider.isIE = function(ver){
    var b = document.createElement('b')
    b.innerHTML = '<!--[if IE ' + ver + ']><i></i><![endif]-->'
    return b.getElementsByTagName('i').length === 1
  }

  Slider.lockScroll = function(){
    $("body").css({"overflow": "hidden"});
  }

  Slider.unlockScroll = function(){
    $("body").css({"overflow": "auto"});
  }

  Slider.prototype = {
    init:function(selector, config){
      var s = this;
      var $slider = s.slider = $(selector);
      var $dotnav;

      s.length = $slider.find(".slide").length;
      s.activeIndex = 0;
      s.autoplayIndex = 0;
      s.autoplaySlides;
      s.translateX = (!Slider.isIE(8)?true:false);
      s.touchstartX = 0;
      s.classNames = {
        slide: 'slide',
        wrap: 'slides',
        outer: 'slider-wrap',
        prevSlide: 'slide-prev',
        nextSlide: 'slide-next'
      }
      s.name = 'slider'

      s.config = {
        hasDotNav: true,
        hasArrowNav: true,
        autoplay: true,
        autoplayInterval: 4000,
        aspectRatio: 8/5,
        animationTime: 500,
        swipeThresholdWidth: 0.2,
        style: 'flat', // flat | cubic
        infinite: true
      }

      for(option in config){
        if(option === 'style'){
          console.log(typeof config[option])
          if(['flat','cubic'].indexOf(config[option]) === -1){
            console.error('Style undefined, default style will be applied')
            continue
          }
        }
        s.config[option] = config[option];
      }

      s.buildDom();
      s.autoplay();

      $(window).resize(function(){
        s.setSliderStyle(s);
      });

      $slider[0].addEventListener("touchstart", function(e){
        s.handleTouch(e, s)
      });
      $slider[0].addEventListener("touchmove", function(e){
        s.handleTouch(e, s)
      });
      $slider[0].addEventListener("touchend", function(e){
        s.handleTouch(e, s)
      });
    },
    handleTouch:function(e, context){
      var touches = e.changedTouches;
      var x = touches[0].pageX;
      var y = touches[0].pageY;
      var s = context;
      var $slider = s.slider;

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
          var left = (i-s.activeIndex)*s.width+(x-s.touchstartX);
          s.setSlidePosition(i, left, false);
        }
      }
    },
    buildDom:function(){
      var s = this;
      var $slider = s.slider;

      // prepare slides
      $slider
        .addClass(s.classNames.outer+" "+s.name+"-"+s.config.style)
        .append("<div class='"+s.classNames.wrap+"'></div>")
        .find("."+s.classNames.wrap).append($slider.find("."+s.classNames.slide))
        .find("."+s.classNames.slide).eq(s.activeIndex).addClass("active");

      s.setSliderStyle(s);

      // dot nav
      if(s.config.hasDotNav){
        $slider.append("<nav class='dot-nav'><ul></ul></nav>");
        $dotNav = s.dotNav = $slider.find(".dot-nav");

        for(var i = 0;i < s.length;i++){
          $dotNav.find("ul").append("<li><a href='#'></a></li>")
        }
        $dotNav.on("click","li a",function(){
          var index = $(this).parent().index();
          s.slideTo(index);
          clearInterval(s.autoplaySlides);
          return false;
        });
        $dotNav.find("li").eq(s.activeIndex).addClass("active");
      }

      // arrow nav
      if(s.config.hasArrowNav){
        $slider
          .append("<nav class='arrow-nav'><ul><li class='slider-nav-prev'></li><li class='slider-nav-next'></li></ul></nav>")
          .on("click",".slider-nav-next",function(){
            s.slideToNext();
            clearInterval(s.autoplaySlides);
          })
          .on("click",".slider-nav-prev",function(){
            s.slideToPrev();
            clearInterval(s.autoplaySlides);
          });
      }
    },
    setSliderStyle:function(context){
      var s = context;
      var $slider = s.slider;
      var $slides = $slider.find(".slide")

      s.width = $slider.width();
      s.height = s.width/s.config.aspectRatio;

      s._setSlidesPosition(s.activeIndex)

      $slider.find(".slides .slide,.slides").width(s.width).height(s.height);
      $slides.removeClass(s.classNames.prevSlide).eq(s.activeIndex-1).addClass(s.classNames.prevSlide)
      $slides.removeClass(s.classNames.nextSlide).eq(s.activeIndex+1).addClass(s.classNames.nextSlide)
    },
    autoplay:function(){
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
    },
    setSlidePosition:function(index, left, isAnimated){
      var s = this;
      var $slider = s.slider;
      var transition;

      if(isAnimated === true){
        transition = "all "+s.config.animationTime+"ms";
      }else{
        transition = "all 0ms";
      }

      if(s.config.style === 'flat'){
        if(s.translateX){
          $slider.find(".slides .slide").eq(index).css({
            transform: "translateX("+left+"px)",
            transition: transition
          });
        }else{
          $slider.find(".slides .slide").eq(index).css({
            left: left,
            transition: transition
          });
        }
      }
      if(s.config.style === 'cubic'){
        if(s.activeIndex === index){
          $slider.find(".slides .slide").eq(index).css({
            transform: "translateX("+left+"px) scale(1.7,1.7)",
            transition: transition
          });
        }else{
          $slider.find(".slides .slide").eq(index).css({
            transform: "translateX("+left+"px) scale(1,1)",
            transition: transition
          });
        }
      }
    },
    slideTo:function(index){
      var s = this;
      var $slider = s.slider;
      var $slides = $slider.find(".slides .slide")

      if(index > s.length-1){
        index = 0;
      }else if(index < 0){
        index = s.length-1;
      }

      s.activeIndex = index;
      $slides.removeClass("active").eq(index).addClass("active");
      $slides.removeClass(s.classNames.prevSlide).eq(index-1).addClass(s.classNames.prevSlide);
      $slides.removeClass(s.classNames.nextSlide).eq(index+1).addClass(s.classNames.nextSlide);

      if(s.config.hasDotNav){
        $slider.find(".dot-nav li").removeClass("active").eq(index).addClass("active");
      }
      s._setSlidesPosition(index);

    },
    slideToNext:function(){
      var s = this;
      s.slideTo(s.activeIndex+1);
    },
    slideToPrev:function(){
      var s = this;
      s.slideTo(s.activeIndex-1);
    },
    _setSlidesPosition:function(activeIndex){
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
  };
  Slider.prototype.init.prototype = Slider.prototype;

  jQuery.fn.slider = function(config){
    return new Slider(this, config);
  }

  return Slider;
});
