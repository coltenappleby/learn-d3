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

    const landColor = "green";
    const landStroke = "grey";

    const pathGenerator = d3.geoPath();

    Promise.all([
            d3.json(urlCounty),
            d3.json(urlEDU)
        ]).then(([data1, data2]) => {
            const us = data1;
            const edu = data2;
            console.log(edu)
            console.log(us)

            const eduLevel = edu.map(d => d.bachelorsOrHigher)

            let colorScale = d3.scaleSequential()
                .interpolator(d3.interpolateRdYlBu)
                .domain([d3.min(eduLevel), d3.max(eduLevel)])

            const getCounty = (id) => {
                const county = edu.find((e) => {
                    e.fips === id
                })
                return county
            }
            console.log(topojson.feature(us, us.objects.counties).features)
            svg // The counties by EDU level
                .append('g')
                .attr('class', 'counties')
                .selectAll('path')
                .datum(topojson.feature(us, us.objects.counties).features)
                .enter()
                .append('path')
                    .attr('testing', d=>{console.log(d)})
                    .attr('class', 'county')
                    .attr('data-fips', d =>{d.fips})
                    .attr('data-education', (d) => getCounty(d.id).bachelorsOrHigher)
                    .style('fill', d=> colorScale(getCounty(d.id).bachelorsOrHigher))
                    .attr('d', pathGenerator)

            svg
                .append('path')

                // Shows only lines that there are multiple. IE only shows borders between two states
                // -cleaner

                // .datum(
                //   topojson.mesh(us, us.objects.states, function (a, b) {
                //     return a !== b;
                //   })
                // )
                // .datum(
                //   topojson.mesh(us, us.objects.counties, function (a, b) {
                //     return a !== b;
                //   })
                // )
                // .attr('class', 'states')
                // .attr('d', pathGenerator)
                // .attr('fill', 'none')
                // .attr('stroke', 'black')

            svg                
                .append('path')
                .datum(topojson.feature(us, us.objects.states))
                .attr('class', 'states')
                .attr('d', pathGenerator)
                .attr('fill', 'none')
                .attr('stroke', 'pink')

        })

        // let projection = d3.geoEquirectangular();

        // let geoGenerator = d3.geoPath()
        //     .projection(projection);

        // let u = svg
        //     .selectAll('path')
        //     .data(rawGeoData.objects.counties.geometries)
        //     .join('path')
        //     .attr('d', geoGenerator);

    
});