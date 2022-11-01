document.addEventListener('DOMContentLoaded', function(){
    
    const urlEDU = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json';
    const urlCounty = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json';

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

    const pathGenerator = d3.geoPath();

    Promise.all([
            d3.json(urlCounty),
            d3.json(urlEDU)
        ]).then(([data1, data2]) => {
            const us = data1;
            const edu = data2;
            console.log(edu)
            console.log(us)         

            const eduLevel = edu.map(d => d.bachelorsOrHigher);
            const minEduLevel = d3.min(eduLevel);
            const maxEduLevel = d3.max(eduLevel);

            let colorScale = d3.scaleSequential()
                .interpolator(d3.interpolateRdYlBu)
                .domain([minEduLevel, maxEduLevel])

            const getCounty = (id) => {
                const county = edu.find(({fips}) => fips === id)
                return county
            }
            console.log(getCounty(5089))
            
            const counties = svg.append('g')
                .attr('class', 'counties')
                .selectAll('path')
                .data(topojson.feature(us, us.objects.counties).features)
                .enter()
                .append('path')
                    .attr('d', pathGenerator)
                    // .attr('testing', d=>{console.log(getCounty(d.id))})
                    .attr('class', 'county')
                    .attr('data-fips', d => d.id)
                    .attr('data-education', (d) => getCounty(d.id).bachelorsOrHigher)
                    .style('fill', d=> colorScale(getCounty(d.id).bachelorsOrHigher))
                    .on('mouseover', (e,d) => {
                        const county = getCounty(d.id)
                        tooltip.transition().duration(200).style('opacity', 0.9)
                        tooltip
                            .html(
                                `${county.area_name}, ${county.state}: ${county.bachelorsOrHigher}%`
                            )
                            .attr('data-education', county.bachelorsOrHigher)
                            .style('opacity', 1)
                            .style('left', e.pageX+'px')
                            .style('top', e.pageY+'px')
                            .attr('data-year', d.Year)
                    .on('mouseout', function () {
                        tooltip.style('opacity', 0);
                    });
                    })
            const states = svg                
                .append('path')
                .datum(topojson.feature(us, us.objects.states))
                .attr('class', 'states')
                .attr('d', pathGenerator)
                .attr('fill', 'none')
                .attr('stroke', 'grey')

            // Legend
            const legend = svg.append('g')
                .attr('id', 'legend')

            const legendNums = (minTemp, maxTemp, count) => {
                let array = []
                let step = (maxTemp-minTemp) / count
                let base = minTemp
                for ( let i = 1; i < count; i++){
                    array.push(base + i * step)
                }
                return array
            }
            const quants = legendNums(minEduLevel, maxEduLevel, 7)

            const legendScale = d3.scaleLinear()
                .domain([quants[0], quants[5]])
                .range([0,300])

            let threshold = d3.scaleThreshold()
                .domain(quants)
                .range(quants.map((d)=>colorScale(d)))

            legend.append("g")
                .attr("id", "legend-axis")
                .attr('transform', `translate(${margin.left+margin.right}, ${height+margin.top+margin.bottom/2+20})`)
                .call(d3.axisBottom(legendScale)
                    .tickSize(13)
                    .tickValues(threshold.domain())
                )

            const tiles = legend.append('g')
                .attr('id', 'legend-colors')
                .selectAll('legend-cells')
                .data(threshold.range().map((color) => {
                    let d = threshold.invertExtent(color); //tells you the start and stop
                    if (d[0] === null) {
                        d[0] = legendScale.domain()[0];
                      }
                    if (d[1] === null) {
                        d[1] = legendScale.domain()[1];
                      }
                      return d;
                }))
                .enter()
                .append('rect')
                    .attr('class', 'legend-cells')
                    .attr('x', d => legendScale(d[0]))
                    .attr('width', d => legendScale(d[1]) - legendScale(d[0]))
                    .attr('height', 20)
                    .style('fill', d => colorScale(d[0]))
                    .attr('transform', `translate(${margin.left+margin.right}, ${height+margin.top+margin.bottom/2})`)

        })
});