document.addEventListener('DOMContentLoaded', function(){
    
    const url = 'https://gist.githubusercontent.com/coltenappleby/9f7a36cc268ee2692cdbb2700eea64f2/raw/4eec8c1d4bb12afab46055b9d1572011ab68d062/tiered-package.csv'

    // import rawData from  data.json

    // Size of plot
    const width = 1000
    const height = 1000
    const margin = {"top": 25, "right": 25, "bottom": 25, "left": 40}
    const left = 200;
    const top = 60;

    Papa.parse(url, {
        header: true,
        download: true,
        skipEmptyLines: true,
        delimiter: ',',
        complete(results) {
           
            let tempData = results.data.map((d) => {
                return {
                    id: d.externalId,
                    name: d.name,
                    parentId: d.externalId_parent,
                }
            })

            // Create a root node from tempData 
            let root = d3.stratify()
                .id(d => d.id)
                .parentId(d => d.parentId)
                (tempData)
                .sum(d => d.name.length)
            
            // Create a pack layout
            let pack = d3.pack()
                .size([width, height])
                .padding(3)
            
            // Create a hierarchy from root
            let hierarchy = d3.hierarchy(root)
                .sum(d => d.value)

            // Create a pack from hierarchy
            let packData = pack(hierarchy).leaves()

            // Create a color scale
            let color = d3.scaleOrdinal(d3.schemeCategory10)


            // Create a svg
            const svg = d3.select(".container")
                .append("svg")
                .attr("height", height + top)
                .attr("width", width + left)
                // .attr('transform', `translate(${left}, ${top})`)
                .style('background', '#f4f4f4')

            // Create a tooltip
            let tooltip = d3.select('#chart')
                .append('div')
                .attr('id', 'tooltip')
                .style('opacity', 0)
                .style('padding', '5px')

            // Create a node
            let node = svg.selectAll('g')
                .data(packData)
                .enter()
                .append('g')
                .attr('transform', d => `translate(${d.x}, ${d.y})`)

            console.log(packData)
                
            // Create a circle
            node.append('circle')
                .attr('r', d => d.r)
                .attr('fill', d => color(d.data.value))
                .attr('stroke', '#fff')
                .attr('stroke-width', 2)
                .attr('id', d => d.data.id)
                .on('mouseover', (e,i) => {
                    tooltip.transition()
                        .duration(200)
                        .style('opacity', 0.9)
                    tooltip.html(`TEST`)
                        .style('left', `${e.pageX}px`)
                        .style('top', `${e.pageY}px`)
                })
                .on('mouseout', (d, i) => {
                    tooltip.transition()
                        .duration(200)
                        .style('opacity', 0)
                })





        }
    })
});