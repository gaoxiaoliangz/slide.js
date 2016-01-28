
# Slider
Easy to use slide show

## Usage

```
Slider(".your-slider-class",{
  autoplay: true
})
```

Or you can you use Outliner in the jQuery style

```
$(".your-slider-class").slider({
  autoplay: true
})
```

## Parameters
Slider(selector, config)

### selector
`selector` is the target DOM element that you want Slider to put its content in.

### config
| option name | default value | description |
| ----------- | ------------- | ----------- |
| hasDotNav | true | show dot nav |
| hasArrowNav | true | show arrow nav |
| autoplay | true | autoplay slides, once the user click on the nav, autoplay stops |
| autoplayInterval | 4000 | define how many milliseconds one auto slide happens |
| aspectRatio | 8/5 | define the aspect ratio of the slide area |
| animationTime | 500 | define how long the animation lasts, the shorter the faster |
