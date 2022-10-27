document.addEventListener('DOMContentLoaded', function(){
    
    const urlEDU = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json';
    const urlCounty = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json';

    // Size of plot
    const width = 1000
    const height = 600
    const margin = {"top": 30, "right": 50, "bottom": 130, "left": 70}

    // Setting up the SVG
    const svg = d3.select("body")
        .append("svg")
        .attr("height", height + margin.top + margin.bottom)
        .attr("width", width + margin.left + margin.right)

    // Tooltip
    let tooltip = d3.select("body")
        .append("div")
        .attr('id', 'tooltip')
        .style("opacity", 0)
        .style("padding", "5px")   

    d3.json(urlCounty).then((rawGeoData) => {
        const countyFeatures = rawGeoData.objects.counties.geometries.map((poly) => poly.arcs[0])
        console.log(countyFeatures)
        console.log(rawGeoData.objects.counties.geometries)
        svg.selectAll("path")
            .data(countyFeatures)
            .enter()
            .append("path")
                .attr("d", d3.geoPath())
                .style("stroke", "#fff")
                .style("stroke-width", "1")
                // .style('stroke', 'black')

    }) 
});