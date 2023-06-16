document.addEventListener('DOMContentLoaded', function(){
    
    const url = 'https://gist.githubusercontent.com/coltenappleby/9f7a36cc268ee2692cdbb2700eea64f2/raw/4eec8c1d4bb12afab46055b9d1572011ab68d062/tiered-package.csv'

    // import rawData from  data.json

    // Size of plot
    const width = 1000
    const height = 1500
    const margin = {"top": 25, "right": 25, "bottom": 25, "left": 40}
    const left = 200;
    const top = 60;

    // Tooltip
    let tooltip = d3.select(".container")
        .append("div")
        .attr('id', 'tooltip')
        .style("opacity", 0)
        .style("padding", "5px")   


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
        
            let stratify = d3.stratify()
                .id(d => d.id)
                .parentId(d => d.parentId)
            let root = stratify(tempData)

            console.log(root)

            const svg = d3.select(".container")
                .append("svg")
                .attr("height", height + top)
                .attr("width", width + left)
            
            // Declares a tree layout and assigns the size
            const treemap = d3.tree().size([height, width]);
            nodes = treemap(root);            
            
            const node = svg.selectAll(".node")
                .data(nodes.descendants())
                .enter()
                .append('g')
                .attr("class", d => "node" + (d.children ? " node--internal": " node--leaf"))
                .attr("transform", d => "translate(" + d.y + "," + d.x + ")")
            
            const link = svg.selectAll(".link")
                .data(nodes.descendants().slice(1))
                .enter().append("path")
                .attr("class", "link")
                .style("stroke", "black")
                .style("stroke-width", .5)
                .attr("d", d=> {
                    return "M" + d.y + "," + d.x
                    + "C" + (d.y + d.parent.y) / 2 + "," + d.x
                    + " " + (d.y + d.parent.y) / 2 + "," + d.parent.x
                    + " " + d.parent.y + "," + d.parent.x;
                })
            
            
            node.append("circle")
                .attr("r", 4)
                .style("stroke", "black")
                .style("fill", "white")
            
            node.append("text")
                .attr("dy", ".35em")
                .attr("x", d => d.children ? (1 + 5) * -1 : 1 + 5)
                .attr("y", -(1 + 5))
                // .style("text-anchor", d => d.children ? "end" : "start")
                .style("text-anchor", "end")
                .text(d => d.data.id.height < 2 ? d.data.id.length : "");
        }
    })
});