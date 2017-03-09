"use strict";

// Network code from: Mike Bostock's example https://bl.ocks.org/mbostock/4062045
var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

var color = {
  "3": "#e4b0b0",
  "1": "#E8336D",
  "8": "#00897b"
};

var circlePadding = 20;

var simulation = d3.forceSimulation().force("link", d3.forceLink().id(function (d) {
  return d.id;
})).force("charge", d3.forceManyBody()).force("center", d3.forceCenter(width / 2, height / 2));

d3.json("miserables.hidden.json", function (error, graph) {
  if (error) throw error;
  var link = svg.append("g").attr("class", "links").selectAll("line").data(graph.links).enter().append("line").attr("stroke-width", function (d) {
    return Math.sqrt(d.value);
  });
  var node = svg.append("g").attr("class", "nodes").selectAll("circle").data(graph.nodes).enter().append("circle").attr("r", 5).attr("fill", function (d) {
    return color[d.group + ''] || 'lightgrey';
  }).call(d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended));

  node.append("title").text(function (d) {
    return d.id;
  });

  simulation.nodes(graph.nodes).on("tick", ticked);

  simulation.force("link").links(graph.links);

  function ticked() {
    link.attr("x1", function (d) {
      return d.source.x;
    }).attr("y1", function (d) {
      return d.source.y;
    }).attr("x2", function (d) {
      return d.target.x;
    }).attr("y2", function (d) {
      return d.target.y;
    });
    node.attr("cx", function (d) {
      return d.x;
    }).attr("cy", function (d) {
      return d.y;
    });

    makeAnnotations.annotations().forEach(function (d, i) {
      points = graph.nodes.filter(function (d) {
        return d.group === groups[i];
      }).map(function (d) {
        return { x: d.x, y: d.y, r: 5 };
      });
      circle = d3.packEnclose(points);
      d.position = { x: circle.x, y: circle.y };
      d.subject.radius = circle.r + circlePadding;
    });
    makeAnnotations.update();
  }

  var groups = [3, 1, 8];
  var points = groups.map(function (p) {
    return graph.nodes.filter(function (d) {
      return d.group === p;
    }).map(function (d) {
      return { x: d.x, y: d.y, r: 5 };
    });
  });

  var circle = points.map(function (p) {
    return d3.packEnclose(p);
  });
  var annotations = [{
    note: { label: "Group 3",
      title: "Les Mis" },
    dy: 93,
    dx: -176,
    x: circle[0].x,
    y: circle[0].y,
    type: d3.annotationCalloutCircle,
    subject: {
      radius: circle[0].r + circlePadding,
      radiusPadding: 10
    }
  }, {
    note: { label: "Group 1",
      title: "Les Mis" },
    dy: 93,
    dx: -176,
    x: circle[1].x,
    y: circle[1].y,
    type: d3.annotationCalloutCircle,
    subject: {
      radius: circle[1].r + 20,
      radiusPadding: 10
    }
  }, {
    note: { label: "Group 8",
      title: "Les Mis" },
    dy: 93,
    dx: 176,
    x: circle[2].x,
    y: circle[2].y,
    type: d3.annotationCalloutCircle,
    subject: {
      radius: circle[2].r + 20,
      radiusPadding: 10
    }
  }];

  window.makeAnnotations = d3.annotation().annotations(annotations).accessors({ x: function x(d) {
      return d.x;
    }, y: function y(d) {
      return d.y;
    } });

  svg.append("g").attr("class", "annotation-encircle").call(makeAnnotations);
});

function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}
function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}
function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}
