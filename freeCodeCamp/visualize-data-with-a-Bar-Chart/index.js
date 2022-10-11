document.addEventListener('DOMContentLoaded', function(){
    
    // Steps
    // 1. Load Data
    // 2. Calculate Chart
    // 3. Chart away

    // Loading Data

    const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json'

    // Size of plot
    const width = 800
    const height = 400
    const margin = {"top": 25, "right": 25, "bottom": 25, "left": 40}
    const barWidth = 1
    const outerBound = 25;
    
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    // the SVG

    const svg = d3.select(".container")
        .append("svg")
        .attr("height", height + margin.top + margin.bottom)
        .attr("width", width + margin.left + margin.right)

    // Tooltip
    let tooltip = d3.select(".container")
        .append("div")
        .attr('id', 'tooltip')
        .style("opacity", 0)
        // .style("background-color", "red")
        // .style("border", "solid")
        // .style("border-width", "2px")
        // .style("border-radius", "5px")
        .style("padding", "5px")   


    d3.json(url)
        .then((rawData) => {

            const data = rawData.data.map((event)=>{
                const date = new Date(event[0])
                const year = event[0].substring(0,4)
                let q
                if(event[0].substring(5,7) ==  '01'){
                    q = 'Q1'
                } else if(event[0].substring(5,7) ==  '04'){
                    q = 'Q2'
                } else if(event[0].substring(5,7) ==  '07'){
                    q = 'Q3'
                } else {
                    q = 'Q4'
                }

                //this should probs be an object
                return [
                    date, // Date in JS Date Format
                    `${year}-${q}`, // Date in human readable format
                    event[1], // GDP for that quarter - No Edits 
                    event[0]
                ] 

            })
            
        
            // Scales
            const xScale = d3.scaleTime()
                .domain([d3.min(data, d => d[0]), d3.max(data, d => d[0])])
                .range([0, width])

            const yAxisScale = d3.scaleLinear()
                .domain([d3.min(data, d=>d[2]), d3.max(data, d=>d[2])])
                .range([height, 0])

            const yScale = d3.scaleLinear()
                .domain([d3.min(data, d=>d[2]), d3.max(data, d=>d[2])])
                .range([0, height])

            // Need to add User Story #3

            // Axis
            const bottomAxis = svg.append("g")
                .attr("id", "x-axis")
                .attr("transform", `translate(${margin.left}, ${height+margin.top})`)
                .call(d3.axisBottom(xScale.nice()))

            const leftAxis = svg.append("g")
                .attr("id", "y-axis")
                .attr("transform", `translate(${margin.left}, ${margin.top})`)
                .call(d3.axisLeft(yAxisScale.nice()))

            data.forEach((d) => {})            

            // The Bars
            const bars = svg.selectAll("bar")
                .data(data)
                .enter()
                .append("rect")
                .attr("y", d => height-yScale(d[2])) 
                .attr("x", d => xScale(d[0]))
                .attr("height", d => yScale(d[2]))
                .attr("width", width/data.length-barWidth)
                .attr("transform", `translate(${margin.left}, ${margin.top})`)

                .attr("class", "bar")
                
                // Attributes specified in User Story #7 & #8
                .attr("data-date", d => d[3])
                .attr("data-gdp", d => d[2])
                
                // tooltip
                .on("mouseover", (e,d) => {
                    tooltip.transition().duration(200).style('opacity', 0.9);
                    tooltip
                        .html(`<br> ${d[1]} </br>`)
                        .style("opacity", 1)
                        // .style("left", "calc(50% - " + xScale(d[0])+14 +"px)")
                        .style("left", e.clientX +"px)")
                        .style("left",  e.pageX + 14 + "px")
                        .style("top", innerHeight-50 + "px")
                        .attr("data-date", d[2])
                })
                .on("mouseout", () => {
                    tooltip.transition().duration(200).style('opacity', 0.0)
                })

        })
            
    
    
  });