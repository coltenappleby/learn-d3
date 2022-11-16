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

    let legend = d3.select("body")
        .append("svg")
            .attr('id', 'legend')
            .attr("height", 300)
            .attr("width", 500)
            .attr('transform', `translate(${0}, ${0})`)


    
    d3.json(url).then((rawData) => { 

        const root = d3
            .hierarchy(rawData)
                .sum(d=>d.value)
                .sort((a,b) => { 
                    return b.value - a.value 
                })

        d3.treemap()
            .size([width, height])
            .padding(1)
        (root)

        const colors = d3.scaleOrdinal(d3.schemeAccent)
            .domain(root.children.map(d => d.data.name))

        // This is wrong. Should be by Console
        const salesOpacity = d3.scaleLinear()
            .domain(root.leaves().map(d => d.value))
            .range([0.5, 1])

        let nodes = svg
            .selectAll('g')
            .data(root.leaves())
            .enter()
            .append('g')
            .attr('class', 'node-group')
            .attr('transform', d => `translate(${d.x0 + margin.left}, ${d.y0+margin.top})`)

        nodes
            .append('rect')
                .attr('width', d => d.x1 - d.x0)
                .attr('height', d => d.y1 - d.y0)
                .attr('data-name', d => d.data.name)
                .attr('data-category', d=> d.data.category)
                .attr('data-value', d=> d.data.value)
                .style('fill', d => colors(d.parent.data.name))
                .style('opacity', d => salesOpacity(d.value))
                .attr('class', 'tile')

        nodes.append('text')
            .attr('class', 'text')
            // .attr('x', 5)
            .attr('y', 13)
            .attr('dy', 0) // wrap requires a dy
            .attr('width', d => d.x1 - d.x0)
            .text(d => d.data.name)
            .call(wrap)


        // Mike Bostock Code
        function wrap(text) {
            text.each(function() {
                var text = d3.select(this),
                    words = text.text().split(/\s+/).reverse(),
                    word,
                    width = parseFloat(text.attr('width'));
                    line = [],
                    lineNumber = 0,
                    lineHeight = 1.1, // ems
                    y = text.attr("y"),
                    dy = parseFloat(text.attr("dy")),
                    tspan = text
                        .text(null)
                        .append("tspan")
                        .attr("x", 2)
                        .attr("y", y)
                        .attr("dy", dy + "em");
                while (word = words.pop()) {
                    line.push(word);
                    tspan.text(line.join(" "));
                    if (tspan.node().getComputedTextLength() > width) {
                        line.pop();
                        tspan.text(line.join(" "));
                        line = [word];
                        tspan = text
                            .append("tspan")
                            .attr("x", 2)
                            .attr("y", y)
                            .attr("dy", ++lineNumber * lineHeight + dy + "em")
                            .text(word);
                    }
                }
            });
        }

        nodes
            .on("mousemove", (e,d)=> {
                tooltip.transition().duration(200).style('opacity', 0.9)
                tooltip
                    .html(
                        `<b>Console</b>: ${d.data.category}</br>
                        <b>Game</b>: ${d.data.name}</br>
                        <b>Sales</b>: ${d.data.value} millions
                        `
                    )
                    .style('opacity', 1)
                    .style('left', e.pageX+'px')
                    .style('top', e.pageY+'px')
                    .attr('data-value', d.data.value)
            })
            .on("mouseout", () => {
                tooltip.transition().duration(200).style('opacity', 0)               
            })
            
    
        // Lets make the Legend
            
        const categories = root.children.map(d => d.data.name)

        const V_SPACING = 40;
        const H_SPACING = 100;
        const cols = Math.floor(categories.length/5)
        const RECT_HEIGHT = 20;
        const RECT_WIDTH = 20;

        let elements = legend.selectAll('g')
            .data(categories)
            .enter()
            .append('g')
            .attr('transform', (d,i) => {
                return(
                    `translate(${i%cols * H_SPACING}, ${Math.floor(i / cols) * V_SPACING})`
                )
            })

        elements//.selectAll('g')
            .append('rect')
            .attr('x', 0)
            .attr('y', 0)
            .attr('height', RECT_HEIGHT)
            .attr('width', RECT_WIDTH)
            .style('fill', d => colors(d))
            .attr('class', 'legend-item')
        
        elements.append('text')
            .attr('x', RECT_WIDTH*1.2)
            .attr('y', RECT_HEIGHT*.8)
            .text(d => d)
            .style('font-size', 15)
    })


});




// Text Wrap
        
// Works but it not perfect 
// Each word is its own line
    // nodes.append('text')
    //     .attr('class', 'tile-text')
    //     .selectAll('tspan')
    //     .data((d) => {
    //         return d.data.name.split(/(?=[A-Z][^A-Z])/g);
    //     })
    //     .enter()
    //     .append('tspan')
    //     .attr('x', 4)
    //     .attr('y', function (d, i) {
    //         return 13 + i * 10;
    //     })
    //     // .style("overflow-y", "auto")
    //     .text((d) => {
    //         return d;
    //     });