document.addEventListener('DOMContentLoaded', function(){
    
    const playersURL = 'https://gist.githubusercontent.com/coltenappleby/ce32b6c878ee1bd5d75d438d7b106624/raw/5e907d408b4edc0893bc37d790c3734f17a868ad/2022_Players_by_WAR';
    const colorsURL =  'https://gist.githubusercontent.com/coltenappleby/2814a35ff4204fb9fecca5a610970a80/raw/63c16b2f1d42e2a8cc3de2e619297e79f1223a82/lots_of_colors'

    // Size of plot
    const width = 1000
    const height = 1000
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


    
    Promise.all([
        d3.json(playersURL),
        d3.json(colorsURL)
        ]).then(([data1, data2]) => {
            const players = data1;
            const colors = data2.slice(0,30);
            console.log(players)
            console.log(colors)     

        const teams = d3.group(players, d => d.Team)

        const root = d3
            .hierarchy(teams)
                .sum(d=>d.Total_WAR)
                .sort((a,b) => { 
                    return b.Total_WAR - a.Total_WAR 
                })
        
        // console.log(color)
        
        d3.treemap()
            .size([width, height])
            .padding(1)
        (root)

        const myColors = d3.scaleOrdinal(d3.schemeTableau10)
            .domain(root.children.map(d => d.data[0]))
            // .range(colors)

        console.log(root.leaves())

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
                .attr('player-name', d => d.data.Name)
                .attr('team-name', d=> d.data.Team)
                .attr('total-war', d=> d.data.Total_WAR)
                .style('fill', d => myColors(d.parent.data[0]))
                .style('opacity', d => salesOpacity(d.value))
                .attr('class', 'tile')

        nodes.append('text')
            .attr('class', 'text')
            // .attr('x', 5)
            .attr('y', 13)
            .attr('dy', 0) // wrap requires a dy
            .attr('width', d => d.x1 - d.x0)
            .text(d => {
                return d.data.Total_WAR > .7 ? d.data.Name : ''
            })
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
                        `<b>Player:</b>: ${d.data.Name}</br>
                        <b>Team</b>: ${d.data.Team}</br>
                        <b>Pitch/Bat/Tot War</b>: ${d.data.Pit_WAR==''?0:d.data.Pit_WAR}/${d.data.Bat_WAR==''?0:d.data.Bat_WAR}/${d.data.Total_WAR} WAR
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
            
        const categories = root.children.map(d => d.data[0])

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
            .style('fill', d => myColors(d))
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