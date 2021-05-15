var svgWidth = 600;
var svgHeight = 400;

var margin = {
    top: 20,
    right: 40,
    bottom: 100,
    left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


var chosenXAxis = "danceability";
var chosenYAxis = "instrumentalness";


function xScale(data, chosenXAxis) {
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(data, d => d[chosenXAxis]) * 0.8,
        d3.max(data, d => d[chosenXAxis]) * 1.2
      ])
      .range([0, width]);
  
    return xLinearScale;
}

function yScale(data, chosenYAxis) {
  var yLinearScale = d3.scaleLinear()
      .domain([d3.min(data, d => d[chosenYAxis]) * 0.8,
      d3.max(data, d => d[chosenYAxis]) * 1.2
      ])
      .range([height, 0]);

  return yLinearScale;
}

function renderXAxes(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);
  
    xAxis.transition()
      .duration(1000)
      .call(bottomAxis);
  
    return xAxis;
}
  
function renderYAxes(newYScale, yAxis) {
    var leftAxis = d3.axisLeft(newYScale);
  
    yAxis.transition()
        .duration(1000)
        .call(leftAxis);
  
    return yAxis;
}

function renderXCircles(circlesGroup, newXScale, chosenXAxis) {

    circlesGroup.transition()
      .duration(1000)
      .attr("cx", d => newXScale(d[chosenXAxis]));
  
    return circlesGroup;
}

function renderYCircles(circlesGroup, newYScale, chosenYAxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cy", d => newYScale(d[chosenYAxis]));

  return circlesGroup;
}

function renderXCircleText(textCircles, newXScale, chosenXAxis) {

    textCircles.transition()
        .duration(1000)
        .attr("x", d => newXScale(d[chosenXAxis]));
  
    return textCircles;
  }
  
function renderYCircleText(textCircles, newYScale, chosenYAxis) {
  
    textCircles.transition()
        .duration(1000)
        .attr("y", d => newYScale(d[chosenYAxis]));
  
    return textCircles;
}

/////////////////////////////////////////////////////////////////
d3.csv("code/data/top_51_genres.csv").then(function(data, err) {
    if (err) throw err;
  
    // parse data
    data.forEach(function(D) {
        D.energy = +D.energy;
        D.acousticness = +D.acousticness;
        D.loudness = +D.loudness;
        D.danceability = +D.danceability;
        D.instrumentalness = +D.instrumentalness;
        D.tempo = +D.tempo;
        D.liveness = +D.liveness;
        D.speechiness = +D.speechiness;
});

    var xLinearScale = xScale(data, chosenXAxis);
  
    // Create y 
    var yLinearScale = yScale(data, chosenYAxis);
  
    // Create initial axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);
  
    // append x axis
    var xAxis = chartGroup.append("g")
      .classed("x-axis", true)
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    // append y axis
    var yAxis = chartGroup.append("g")
      .classed("y-axis", true)
      .call(leftAxis);

    function changecolor(color){
        return "blue"
      }

    
    // append initial circles
    var circlesGroup = chartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d[chosenYAxis]))
    .attr("r", 5)
    .classed("stateCircle", true);


    var textCircles = chartGroup.append("g")
    .selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .text(d => d.abbr)
    .attr("x", d => xLinearScale(d[chosenXAxis]))
    .attr("y", d => yLinearScale(d[chosenYAxis]))
    .classed("stateText", true)

    // Create group for x-axis labels
    var xlabelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height + 20})`);
  
    var danceabilityLabel = xlabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 20)
    .attr("value", "danceability") 
    .classed("active", true)
    .text("Danceability");

    var acousticnessLabel = xlabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 40)
    .attr("value", "acousticness") 
    .classed("inactive", true)
    .text("Acousticness");
    
    var loudnessLabel = xlabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 60)
    .attr("value", "loudness") 
    .classed("inactive", true)
    .text("Loudness"); 

    // var danceabilityLabel = xlabelsGroup.append("text")
    // .attr("x", 0)
    // .attr("y", 80)
    // .attr("value", "danceability") 
    // .classed("inactive", true)
    // .text("Danceability"); 

    // Create group for x-axis labels
    var ylabelsGroup = chartGroup.append("g")
        .attr("transform", "rotate(-90)");

    var instrumentalnessLabel = ylabelsGroup.append("text")
    .attr("y", 0 - margin.left + 55)
    .attr("x", 0 - (height / 2))
    .attr("value", "instrumentalness") // value to grab for event listener
    .classed("active", true)
    .text("Instrumentalness");

    var tempoLabel = ylabelsGroup.append("text")
    .attr("y", 0 - margin.left + 35)
    .attr("x", 0 - (height / 2))
    .attr("value", "tempo")
    .classed("inactive", true)
    .text("Tempo");

    var speechinessLabel = ylabelsGroup.append("text")
    .attr("y", 0 - margin.left + 15)
    .attr("x", 0 - (height / 2))
    .attr("value", "speechiness")
    .classed("inactive", true)
    .text("Speechiness");

    // var speechinessLabel = ylabelsGroup.append("text")
    // .attr("y", 0 - margin.left + 5)
    // .attr("x", 0 - (height / 2))
    // .attr("value", "speechiness")
    // .classed("inactive", true)
    // .text("Speechiness");


    ////////////////////////////////////////////////////////////////////////////////
    console.log(textCircles)





     ////////////////////////////////////////////////////////////////////////////////

    // x axis labels event listener
    xlabelsGroup.selectAll("text")
      .on("click", function() {
        // get value of selection
        var value = d3.select(this).attr("value");
        if (value !== chosenXAxis) {
  
          // replaces chosenXAxis with value
          chosenXAxis = value;
  
          console.log(chosenXAxis)
  
          // functions here found above csv import
          // updates x scale for new data
          xLinearScale = xScale(data, chosenXAxis);
          console.log(xLinearScale)

          // updates x axis with transition
          xAxis = renderXAxes(xLinearScale, xAxis);
  
          // updates circles with new x values
          circlesGroup = renderXCircles(circlesGroup, xLinearScale, chosenXAxis);
          textCircles = renderXCircleText(textCircles, xLinearScale, chosenXAxis);

        // changes classes to change bold text
        if (chosenXAxis === "acousticness") {
            acousticnessLabel
              .classed("active", true)
              .classed("inactive", false);
            loudnessLabel
              .classed("active", false)
              .classed("inactive", true);
            danceabilityLabel
              .classed("active", false)
              .classed("inactive", true);
          } else if (chosenXAxis === "loudness"){
            acousticnessLabel
              .classed("active", false)
              .classed("inactive", true);
            loudnessLabel
              .classed("active", true)
              .classed("inactive", false);
            danceabilityLabel
              .classed("active", false)
              .classed("inactive", true);
          } else {
            acousticnessLabel
               .classed("active", false)
               .classed("inactive", true);
            loudnessLabel
               .classed("active", false)
               .classed("inactive", true);
            danceabilityLabel
               .classed("active", true)
               .classed("inactive", false);
          }
        }
    });

    // y axis labels event listener
    ylabelsGroup.selectAll("text")
    .on("click", function() {
      // get value of selection
      var value = d3.select(this).attr("value");
      console.log(value)
      if (value !== chosenYAxis) {

        // replaces chosenXAxis with value
        chosenYAxis = value;

        // console.log(chosenXAxis)

        // functions here found above csv import
        // updates x scale for new data
        yLinearScale = yScale(data, chosenYAxis);

        // updates x axis with transition
        yAxis = renderYAxes(yLinearScale, yAxis);

        // updates circles with new x values
        circlesGroup = renderYCircles(circlesGroup, yLinearScale, chosenYAxis);
        textCircles = renderYCircleText(textCircles, yLinearScale, chosenYAxis);
        console.log(chosenYAxis)
        // changes classes to change bold text
        if (chosenYAxis === "tempo") {
            tempoLabel
             .classed("active", true)
             .classed("inactive", false);
            speechinessLabel
             .classed("active", false)
             .classed("inactive", true);
            instrumentalnessLabel
             .classed("active", false)
             .classed("inactive", true);
        } else if (chosenYAxis === "speechiness"){
            console.log(chosenYAxis)
            tempoLabel
             .classed("active", false)
             .classed("inactive", true);
            speechinessLabel
             .classed("active", true)
             .classed("inactive", false);
            instrumentalnessLabel
             .classed("active", false)
             .classed("inactive", true);
        } else {
            tempoLabel
             .classed("active", false)
             .classed("inactive", true);
            speechinessLabel
             .classed("active", false)
             .classed("inactive", true);
            instrumentalnessLabel
             .classed("active", true)
             .classed("inactive", false);
        }
      }
    });
  }).catch(function(error) {
    console.log(error);
  });
