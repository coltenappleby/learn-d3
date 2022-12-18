document.addEventListener('DOMContentLoaded', function(){
    
    const url = 'https://gist.githubusercontent.com/coltenappleby/75940e1211962317dbb1f8796266adb4/raw/ed635d7dfc98fdcb767444f44eaea81dccfb353e/2022_Spotify_Streaming_Data';


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
            .attr("width", 900)
            .attr('transform', `translate(${0}, ${0})`)

    d3.json(url).then((rawData) => { 

        const listens = rawData.map((listen) => {
            listen.seconds = listen.msPlayed / 1000
            listen.endTime = new Date(listen.endTime)
            listen.startTime = new Date(listen.endTime - listen.msPlayed)
            return listen
          })

        const artists = d3.rollup(listens, v => d3.sum(v, d=> d.seconds), d=> d.artistName, d=> d.trackName,) //This is what I want
 
        const childrenAccessorFn = ([ key, value ]) => value.size && Array.from(value);
        const root = d3.hierarchy([null, artists], childrenAccessorFn)
            .sum(([key, value]) => value)
            .sort((a, b) => b.value - a.value);
        
        
        d3.treemap()
            .size([width, height])
            .padding(1)
        (root)

        // const totalTime = d3.sum(root.children.slice(0, 20).map(d => d.value))
        // console.log(totalTime)
        // html.select('listens').innerhtml(totalTime)


        const colors = d3.scaleOrdinal(d3.schemeAccent)
            .domain(root.children.map(d => d.parent.value))

        const timeFormat = d3.format(".1f"); // Time Format

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
                .style('fill', d => colors(d.parent.value))
                // .style('opacity', d => salesOpacity(d.value))
                .attr('class', 'tile')

        // Mike Bostock Code
        function wrap(text) {
            text.each(function() {
                var text = d3.select(this),
                    words = text.text().split(/\s+/).reverse(),
                    word,
                    width = parseFloat(text.attr('width')),
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
                        `<b>Artist</b>: ${d.parent.data[0]}</br>
                        <b>Total Artist Time</b>: ${timeFormat(d.parent.value/60)} minutes </br>
                        <b>Song</b>: ${d.data[0]}</br>
                        <b>Total Song Time</b>: ${timeFormat(d.value/60)} minutes
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
            
        const categories = root.children.slice(0, 20)//.map(d => d.data[0])

        const V_SPACING = 40;
        const H_SPACING = 200;
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
            .style('fill', d => colors(d.value))
            .attr('class', 'legend-item')
        
        elements.append('text')
            .attr('x', RECT_WIDTH*1.2)
            .attr('y', RECT_HEIGHT*.8)
            .text(d => d.data[0])
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