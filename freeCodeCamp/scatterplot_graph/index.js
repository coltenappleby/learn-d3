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


    d3.json(url).then((rawData) => {

        const data = rawData.map((d) => {

            const timeSeconds = new Date(d.Seconds*1000)

            return {...d, timeSeconds: timeSeconds}
        })

        // Axis
        const minYear = d3.min(data, d => d.Year)
        const maxYear = d3.max(data, d => d.Year)

        const minTime = d3.min(data, d => d.timeSeconds)
        const maxTime = d3.max(data, d => d.timeSeconds)

        const xScale = d3.scaleLinear()
                        .domain([minYear-1, maxYear])
                        .range([0, width])

        const yScale = d3.scaleTime()
                        .domain([minTime, maxTime])
                        .range([0, height])
        
        const yAxisScale = d3.scaleTime()
                        .domain([minTime, maxTime])
                        .range([height, 0])

        svg.append("g")
            .attr("id", "x-axis")
            .attr('transform', `translate(${left}, ${height})`)
            .call(d3.axisBottom(xScale))

        svg.append("g")
            .attr("id", "y-axis")
            .attr('transform', `translate(${left}, ${0})`)
            // .call(d3.axisLeft(yScale).tickFormat(d=>`${d.getMinutes()}:${d.getSeconds()}`))
            .call(d3.axisLeft(yScale).tickFormat(d=>`${d.getMinutes()}:${d.getSeconds()}`))
            // .tickFormat('%M:%S')
            
        // Time for our dots
        const dots = svg.append('g')
            .selectAll('dot')
            .data(data)
            .enter()
            .append("circle")
                .attr("cx", d => xScale(d.Year))
                .attr("cy", d => yScale(d.timeSeconds))
                .attr("r", 4)
                .attr("data-xvalue", d => xScale(d.Year))
                .attr("data-yvalue", d => yScale(d.timeSeconds))
            .attr('transform', `translate(${left}, ${0})`)


    })
            
    
    
});