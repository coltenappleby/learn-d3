document.addEventListener('DOMContentLoaded', function(){
    
    const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json'

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

    let overlay = svg.append('rect')

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November',  'December']

    d3.json(url).then((rawData) => {
        
        const baseTemperature = rawData.baseTemperature;
        const data = rawData.monthlyVariance.map((d) => {

            let month = months[d.month-1]
            let temp = baseTemperature-d.variance

            return {...d, monthName: month, temp: temp}
        })

        const years = data.map(d => d.year)

        // Axis Scales
        const xScale = d3.scaleBand()
                        .domain(years)
                        .range([0, width])

        const yScale = d3.scaleBand()
                        .domain(months)
                        .range([0, height])

        // Axis
        const formatYear = d3.format("d")

        svg.append("g")
            .attr("id", "x-axis")
            .attr('transform', `translate(${margin.left}, ${height+margin.top})`)
            .call(d3.axisBottom(xScale).tickValues(xScale.domain().filter((d,i) => !(i%10))))

        svg.append("g")
            .attr("id", "y-axis")
            .attr('transform', `translate(${margin.left}, ${margin.top})`)
            .call(d3.axisLeft(yScale))

        const minVar = d3.min(data, d => d.variance)
        const maxVar = d3.max(data, d => d.variance)
        // Cell's Colors
        let myColor = d3.scaleSequential()
            .interpolator(d3.interpolateInferno)
            .domain([minVar,maxVar])

        const highlightCell = (cell) => {
            cell
                .attr('stroke', 'black')
        }
        const clearHighlightCell = (cell) => {
            cell
                .attr('stroke', 'none')
        }
        
        // Time for Squares
        const formatTemp = d3.format(".3n")	
        const squares = svg.append('g')
            .attr('id', 'data')
            .selectAll('cell')
            .data(data)
            .enter()
            .append('rect')
                .attr('class', 'cell')
                .attr('x', d => xScale(d.year))
                .attr('y', d => yScale(months[d.month-1]))
                .attr('height', height/12)
                .attr('width', width/(d3.max(data, d => d.year) - d3.min(data, d => d.year)))
                .attr('transform', `translate(${margin.left}, ${margin.top})`)
                .attr('data-month', d => d.month-1)
                .attr('data-year', d => d.year)
                .attr('data-temp', d => d.temp)
                .style('fill', d => myColor(d.variance))
            .on("mouseover", (e,d,n) => {
                tooltip.transition().duration(200).style('opacity', 0.9)
                tooltip
                    .html(
                        `${d.year} - ${d.monthName} </br>
                        ${formatTemp(d.temp)}<span>&#176;</span>C <br/>
                        ${formatTemp(d.variance)}<span>&#176;</span>C
                        `
                    )
                    .style('opacity', 1)
                    .style('left', e.pageX+10+'px')
                    .style('top', e.pageY-10+'px')
                    .attr('data-year', d.year)
                d3.select(e.target).call(highlightCell)
            })
            .on("mouseout", (e) => {
                tooltip.transition().duration(200).style('opacity', 0)
                d3.select(e.target).call(clearHighlightCell)         
            })
        

        // Legend
        const legendScale = d3.scaleLinear()
            .domain([minVar, maxVar])
            .range([0,300])

        
        console.log(legendScale(0))
        
        

    }) 
});