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

      s.config = {
        hasDotNav: true,
        hasArrowNav: true,
        autoplay: true,
        autoplayInterval: 4000,
        aspectRatio: 8/5,
        animationTime: 500,
        swipeThresholdWidth: 0.2
      }

      for(option in config){
        s.config[option] = config[option];
      }

      s.buildDom();
      s.autoplay();

      $(window).resize(function(){
        s.setSliderSize(s);
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
        .addClass("slider-wrap")
        .append("<div class='slides'></div>")
        .find(".slides").append($slider.find(".slide"))
        .find(".slides .slide").eq(s.activeIndex).addClass("active");

      s.setSliderSize(s);

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
    setSliderSize:function(context){
      var s = context;
      var $slider = s.slider;

      s.width = $slider.width();
      s.height = s.width/s.config.aspectRatio;

      for(var i = 0;i < s.length;i++){
        var left = i*s.width;
        if(s.translateX){
          $slider.find(".slides .slide").eq(i).css({transform: "translateX("+left+"px)"});
        }else{
          $slider.find(".slides .slide").eq(i).css({left: left});
        }
      }
      $slider.find(".slides .slide,.slides").width(s.width).height(s.height);
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
    },
    slideTo:function(index){
      var s = this;
      var $slider = s.slider;

      if(index > s.length-1){
        index = 0;
      }else if(index < 0){
        index = s.length-1;
      }

      for(var i = 0;i < s.length;i++){
        var left = (i-index)*s.width;
        s.setSlidePosition(i, left, true);
      }
      s.activeIndex = index;
      $slider.find(".slides .slide").removeClass("active").eq(index).addClass("active");

      if(s.config.hasDotNav){
        $slider.find(".dot-nav li").removeClass("active").eq(index).addClass("active");
      }
    },
    slideToNext:function(){
      var s = this;
      s.slideTo(s.activeIndex+1);
    },
    slideToPrev:function(){
      var s = this;
      s.slideTo(s.activeIndex-1);
    },
  };
  Slider.prototype.init.prototype = Slider.prototype;

  jQuery.fn.slider = function(config){
    return new Slider(this, config);
  }

  return Slider;
});
