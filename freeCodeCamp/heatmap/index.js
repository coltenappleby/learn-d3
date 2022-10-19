document.addEventListener('DOMContentLoaded', function(){
    
    const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json'

    // Size of plot
    const width = 800
    const height = 400
    const margin = {"top": 30, "right": 50, "bottom": 30, "left": 70}

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

        console.log(years)

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
        
        // Time for Squares

        const squares = svg.append('g')
            .selectAll('cell')
            .data(data)
            .enter()
            .append('rect')
                .attr('class', 'cell')
                .attr('x', d => xScale(d.year))
                .attr('y', d => yScale(months[d.month]))
                .attr('height', height/12)
                .attr('width', width/(d3.max(data, d => d.year)- d3.min(data, d => d.year)))
                .attr('transform', `translate(${margin.left}, ${margin.top})`)
                .attr('data-month', d => d.month)
                .attr('data-year', d => d.year)
                .attr('data-temp', d => d.temp)
            .on("mouseover", (e,d) => {
                tooltip.transition().duration(200).style('opacity', 0.9)
                tooltip
                    .html(
                        `${d.year} - ${d.monthName} </br>
                        ${d.temp}^C <br/>
                        ${d.variance}^C
                        `
                    )
                    .style('opacity', 1)
                    .style('left', e.pageX+'px')
                    .style('top', e.pageY+'px')
                    .attr('data-year', d.year)
            })
            .on("mouseout", () => {
                tooltip.transition().duration(200).style('opacity', 0)               
            })

        // Time for our dots
        // const dots = svg.append('g')
        //     .selectAll('dot')
        //     .data(data)
        //     .enter()
        //     .append("circle")
        //         .attr('class', 'dot')
        //         .attr("cx", d => xScale(d.Year))
        //         .attr("cy", d => yScale(d.timeSeconds))
        //         .attr("r", 4)
        //         .attr("data-xvalue", d => d.Year)
        //         .attr("data-yvalue", d => d.timeSeconds)
        //         .style('fill', d => d.Doping.length > 0 ? 'lightblue' : 'orange' )
        //         .style('stroke', '#000')
        //         .style('border', "grey")
        //     .attr('transform', `translate(${margin.left}, ${margin.top})`)
        //     .on("mouseover", (e,d)=> {
        //         console.log(d.Doping.length>0)
        //         tooltip.transition().duration(200).style('opacity', 0.9)
        //         tooltip
        //             .html(
        //                 `${d.Name}: ${d.Nationality} </br>
        //                 Year: ${d.Year}, Time: ${d.Time} </br></br>
        //                 ${d.Doping}
        //                 `
        //             )
        //             .style('opacity', 1)
        //             .style('left', e.pageX+'px')
        //             .style('top', e.pageY+'px')
        //             .style('font-size', '6px')
        //             .attr('data-year', d.Year)
        //     })
        //     .on("mouseout", () => {
        //         tooltip.transition().duration(200).style('opacity', 0)               
        //     })


    })
            
    
    
});