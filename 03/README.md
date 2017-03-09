Made with [d3.annotation](http://d3-annotation.susielu.com). An example showing how you can dynamically update the annotations on tick with a network graph.

this iteration that makes the nodes underneath the annotation circles draggable too 🖱🎉

```
  svg.selectAll('.annotation-subject')
    .style('pointer-events', 'none');
```

an iteration on the block [d3-annotation: Encircling Example](https://bl.ocks.org/susielu/24ad9f80b9b681ce967f6005a03384f3) from [@DataToViz](https://twitter.com/datatoviz)

---

now with support for touch events 🎉

```
d3.select('body')
  .on('touchstart', noZoom)
  .on('touchmove', noZoom)

function noZoom() {
  d3.event.preventDefault();
}
```

thanks to [@autiomaa](https://twitter.com/autiomaa) for [pointing out](https://twitter.com/autiomaa/status/839963807153651712) that touch support missing before 😄

further reading on `Event.preventDefault()` the at the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault) and the [w3c spec](https://www.w3.org/TR/dom/#dom-event-preventdefault)