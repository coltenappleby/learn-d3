document.addEventListener('DOMContentLoaded', function(){
    
    const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json'

    // Size of plot
    const width = 800
    const height = 400
    const margin = {"top": 30, "right": 50, "bottom": 30, "left": 50}
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

    let legend = svg
        .append("g")
        .attr('id', 'legend')
        .style("padding", "5px")   
    
    let dopingLegend = legend.append('g')
        .attr('class', 'legend-label')
        .attr('transform', `translate(${0}, ${100})`)
    dopingLegend.append('text')
        .attr('x', 626)
        .attr('y', 10)
        .text("Riders with Doping Allegations")
    dopingLegend.append('rect')
        .attr('x', 790)
        .attr('width', 13)
        .attr('height', 13)
        .style('fill', 'lightblue')

    let noDopingLegend = legend.append('g')
        .attr('class', 'legend-label')
        .attr('transform', `translate(${0}, ${120})`)

    noDopingLegend.append('text')
        .attr('x', 670)
        .attr('y', 10)
        .text("No Doping Allegations")
    noDopingLegend.append('rect')
        .attr('x', 790)
        // .attr('y', 22)
        .attr('width', 13)
        .attr('height', 13)
        .style('fill', 'orange')



    d3.json(url).then((rawData) => {

        const data = rawData.map((d) => {

            const timeSeconds = new Date(d.Seconds*1000)

            return {...d, timeSeconds: timeSeconds}
        })

        // Axis Scales
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

        // Axis
        const formatTime = d3.timeFormat(`%M:%S`)
        const formatYear = d3.format("d")

        svg.append("g")
            .attr("id", "x-axis")
            .attr('transform', `translate(${margin.left}, ${height+margin.top})`)
            .call(d3.axisBottom(xScale).tickFormat(formatYear))

        svg.append("g")
            .attr("id", "y-axis")
            .attr('transform', `translate(${margin.left}, ${margin.top})`)
            .call(d3.axisLeft(yScale).tickFormat(formatTime))
            
        // Time for our dots
        const dots = svg.append('g')
            .selectAll('dot')
            .data(data)
            .enter()
            .append("circle")
                .attr('class', 'dot')
                .attr("cx", d => xScale(d.Year))
                .attr("cy", d => yScale(d.timeSeconds))
                .attr("r", 4)
                .attr("data-xvalue", d => d.Year)
                .attr("data-yvalue", d => d.timeSeconds)
                .style('fill', d => d.Doping.length > 0 ? 'lightblue' : 'orange' )
                .style('stroke', '#000')
                .style('border', "grey")
            .attr('transform', `translate(${margin.left}, ${margin.top})`)
            .on("mouseover", (e,d)=> {
                console.log(d.Doping.length>0)
                tooltip.transition().duration(200).style('opacity', 0.9)
                tooltip
                    .html(
                        `${d.Name}: ${d.Nationality} </br> </br>
                        ${d.Year}, ${d.Time} </br>
                        ${d.Doping}
                        `
                    )
                    .style('opacity', 1)
                    .style('left', e.pageX+'px')
                    .style('top', e.pageY+'px')
                    .style('font-size', '6px')
                    .attr('data-year', d.Year)
            })
            .on("mouseout", () => {
                tooltip.transition().duration(200).style('opacity', 0)               
            })


    })
            
    
    
});