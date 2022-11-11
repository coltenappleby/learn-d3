document.addEventListener('DOMContentLoaded', function(){
    
    const url = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json';

    const colorArray = ['#ffccff',
    '#f4c2fe',
    '#e8b8fc',
    '#dcadfb',
    '#d1a3fa',
    '#c699f9',
    '#ba8ff8',
    '#ae85f6',
    '#a37af5',
    '#9870f4',
    '#8c66f2',
    '#805cf1',
    '#7552f0',
    '#6a47ef',
    '#5e3dee',
    '#5233ec',
    '#4729eb',
    '#3c1fea',
    '#3014e8',
    '#250ae7',
    '#1900e6']

    // Size of plot
    const width = 1000
    const height = 600
    const margin = {"top": 30, "right": 50, "bottom": 130, "left": 70}

    // Setting up the SVG
    const svg = d3.select(".container")
        .append("svg")
        .attr("height", height + margin.top + margin.bottom)
        .attr("width", width + margin.left + margin.right)

    // Tooltip
    let tooltip = d3.select(".container")
        .append("div")
        .attr('id', 'tooltip')
        .style("opacity", 0)
        .style("padding", "5px")   

    
    d3.json(url).then((rawData) => { 

        const root = d3
            .hierarchy(rawData)
                .sum(d=>d.value)
                .sort((a,b) => { b.height - a.height || b.value - a.value })

        d3.treemap()
            .size([width, height])
            .padding(4)
        (root)

        console.log(root.leaves())

        const colors = d3.scaleOrdinal()
            .domain(rawData.children)
            .range(colorArray)


        let nodes = svg.selectAll("rect")
            .data(root.leaves())
            .enter()
            .append('rect')
                .attr('x', d => d.x0)
                .attr('y', d => d.y0)
                .attr('width', d => d.x1 - d.x0)
                .attr('height', d => d.y1 - d.y0)
                .attr('game-name', d => d.data.name)
                .style('fill', d => colors(d.parent.data.name))
        
        
        nodes.append('text')
            .attr('x', 4)
            .attr('y', 14)
            .text((d) => d.data.name)
            .style('fill', 'black')
    })


});


