
# Slider
It's very easy to use slider. In the next version I will apply it to React.

## Usage

```
var s = new Slider(".your-slider-class",{
  autoplay: true
})
```

~~Or you can you use Outliner in the jQuery style~~

In this version, jQuery is removed. It's now vanilla js using ES2015 style of coding, even the dom manipulation part. I wrote the very small lib named dom.js to handle tasks like `addClass`, `removeClass`, `eq` , etc. It behaves just like jQuery, but more compact.


## Parameters
Slider(selector, config)

### selector
`selector` is the target DOM selector where you wanna put content in.

### config
| option name | values | description |
| ----------- | ------ | ----------- |
| hasDotNav | true | show dot nav |
| hasArrowNav | true | show arrow nav |
| autoplay | true | autoplay slides, once the user click the nav, animation will be stopped |
| autoplayInterval | 4000 | define how many milliseconds will an auto-slide take |
| aspectRatio | 8/5 | define the aspect ratio of the slide area |
| animationTime | 500 | define how long the animation lasts, longer or shorter |
| style | `style-flat`(default), `style-cubic` | support two different styles currently |
