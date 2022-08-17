import * as d3 from "d3";

const svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h)
    // Add your code below this line
    .append('rect')
    .attr("width", 25)
    .attr("height", 100)
    .attr("x", 0)
    .attr("y", 0)


console.log("Hello, World")