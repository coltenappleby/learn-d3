document.addEventListener('DOMContentLoaded', function(){
    
    const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json'

    // Size of plot
    const width = 800
    const height = 400
    const margin = {"top": 25, "right": 25, "bottom": 25, "left": 40}
    const left = 100;
    const top = 60;

    // Setting up the SVG
    const svg = d3.select(".container")
        .append("svg")
        .attr("height", height + top)
        .attr("width", width + left)

    // Tooltip
    let tooltip = d3.select(".container")
        .append("div")
        .attr('id', 'tooltip')
        .style("opacity", 0)
        .style("padding", "5px")   


    d3.json(url).then((data) => {

        // Axis

        const minYear = d3.min(data, d => d.Year)
        const maxYear = d3.max(data, d => d.Year)

        const minTime = d3.min(data, d => d.Seconds)
        const maxTime = d3.max(data, d => d.Seconds)

        const xScale = d3.scaleLinear()
                        .domain([minYear, maxYear])
                        .range([0, width]).nice()

        const yScale = d3.scaleLinear()
                        .domain([minTime, maxTime])
                        .range([0, height])
        
        const yAxisScale = d3.scaleLinear()
                        .domain([minTime, maxTime])
                        .range([height, 0])

        svg.append("g")
            .attr("id", "x-axis")
            .attr('transform', `translate(${left}, ${height})`)
            .call(d3.axisBottom(xScale))

        svg.append("g")
            .attr("id", "y-axis")
            .attr('transform', `translate(${left}, ${0})`)
            .call(d3.axisLeft(yAxisScale))


    })
            
    
    
});