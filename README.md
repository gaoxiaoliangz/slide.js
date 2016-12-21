
# slider.js

Easy to use slider

## Usage

```
var s = new Slider(".your-slider-class",{
  autoplay: true
})
```

In this version of Slider.js, jQuery is removed. It's now vanilla js using ES2015 style of coding, even the dom manipulation part. I wrote a very small lib called dom.js to handle tasks like `addClass`, `removeClass`, `eq` , etc. It behaves just like jQuery, but more compact.

## Parameters
Slider(selector, config)

### selector
`selector` is the target DOM selector that you want Slider to put its content in.

### config
| option name | values | description |
| ----------- | ------ | ----------- |
| hasDotNav | true | show dot nav |
| hasArrowNav | true | show arrow nav |
| autoplay | true | autoplay slides, once the user click on the nav, autoplay stops |
| autoplayInterval | 4000 | define how many milliseconds one auto slide happens |
| aspectRatio | 8/5 | define the aspect ratio of the slide area |
| animationTime | 500 | define how long the animation lasts, the shorter the faster |
| style | `style-flat`(default), `style-cubic` | support two different styles for now |
