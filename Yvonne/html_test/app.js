// from data.js
var tableData = data;
console.log("HI")


var tbody = d3.select("tbody");
data.forEach((UFOSighting) => {
    var row = tbody.append("tr");
    Object.entries(UFOSighting).forEach(([key, value]) => {
      var cell = row.append("td");
      cell.text(value);
    });
});

var form = d3.select("form");

var button = d3.select("#filter-btn");

form.on("submit",runEnter);

button.on("click", runEnter);


  function runEnter() {

    // Prevent the page from refreshing
    d3.event.preventDefault();
    
    // Select the input element and get the raw HTML node
    var inputElement = d3.select("#datetime");
  
    // Get the value property of the input element
    var inputValue = inputElement.property("value");
    d3.event.preventDefault();
    // Print the value to the console
    console.log(inputValue);
    
    var filteredData = data.filter(ufo => ufo.datetime == inputValue);
    console.log(filteredData);
    // Clear out table
    tbody.html("");
    

    filteredData.forEach((UFOSighting) => {
        var row = tbody.append("tr");
        Object.entries(UFOSighting).forEach(([key, value]) => {
          var cell = row.append("td");
          cell.text(value);
        });
    });

  }