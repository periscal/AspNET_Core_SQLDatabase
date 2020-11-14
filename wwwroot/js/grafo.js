﻿const svg = d3.create("svg").attr("viewBox", [0, 0, width, height]),
    link = svg
        .selectAll(".link")
        .data(graph.links)
        .join("line")
        .classed("link", true),
    node = svg
        .selectAll(".node")
        .data(graph.nodes)
        .join("circle")
        .attr("r", 12)
        .classed("node", true)
        .classed("fixed", d => d.fx !== undefined);

yield svg.node();

const simulation = d3
    .forceSimulation()
    .nodes(graph.nodes)
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("link", d3.forceLink(graph.links))
    .on("tick", tick);

const drag = d3
    .drag()
    .on("start", dragstart)
    .on("drag", dragged);

node.call(drag).on("click", click);

function tick() {
    link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);
    node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);
}

function click(event, d) {
    delete d.fx;
    delete d.fy;
    d3.select(this).classed("fixed", false);
    simulation.alpha(1).restart();
}

function dragstart() {
    d3.select(this).classed("fixed", true);
}

function dragged(event, d) {
    d.fx = clamp(event.x, 0, width);
    d.fy = clamp(event.y, 0, height);
    simulation.alpha(1).restart();
}

d3 = require("d3@6")

height = Math.min(500, width * 0.6)

function clamp(x, lo, hi) {
    return x < lo ? lo : x > hi ? hi : x;
}

graph = ({
    nodes: Array.from({ length: 13 }, () => ({})),
    links: [
        { source: 0, target: 1 },
        { source: 1, target: 2 },
        { source: 2, target: 0 },
        { source: 1, target: 3 },
        { source: 3, target: 2 },
        { source: 3, target: 4 },
        { source: 4, target: 5 },
        { source: 5, target: 6 },
        { source: 5, target: 7 },
        { source: 6, target: 7 },
        { source: 6, target: 8 },
        { source: 7, target: 8 },
        { source: 9, target: 4 },
        { source: 9, target: 11 },
        { source: 9, target: 10 },
        { source: 10, target: 11 },
        { source: 11, target: 12 },
        { source: 12, target: 10 }
    ]
})

