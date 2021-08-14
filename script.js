var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");
    
var laws;

var path = d3.geoPath();

// var x = d3.scaleLinear(),
//     .domain([1, 10]),
//     .rangeRound([600, 860]);

// var color = d3.scaleThreshold(),
//     .domain(d3.range(0, 10)),
//     .range(d3.schemeBlues[9]);

const state_id = 
{1: "Alabama", 2: "Alaska", 4: "Arizona", 5: "Arkansas", 6: "California", 8: "Colorado", 9: "Connecticut", 10: "Delaware", 12: "Florida", 13: "Georgia", 15: "Hawaii", 16: "Idaho", 17: "Illinois", 18: "Indiana", 19: "Iowa", 20: "Kansas", 21: "Kentucky", 22: "Louisiana", 23: "Maine", 24: "Maryland", 25: "Massachusetts", 26: "Michigan", 27: "Minnesota", 28: "Mississippi", 29: "Missouri", 30: "Montana", 31: "Nebraska", 32: "Nevada", 33: "New Hampshire", 34: "New Jersey", 35: "New Mexico", 36: "New York", 37: "North Carolina", 38: "North Dakota", 39: "Ohio", 40: "Oklahoma", 41: "Oregon", 42: "Pennsylvania", 44: "Rhode Island", 45: "South Carolina", 46: "South Dakota", 47: "Tennessee", 48: "Texas", 49: "Utah", 50: "Vermont", 51: "Virginia", 53: "Washington", 54: "West Virginia", 55: "Wisconsin", 56:	"Wyoming

var promises = [
d3.json("https://d3js.org/us-10m.v1.json"),
d3.csv("envstate.csv").then(function(d) {
	laws = d;
})
]

console.log("before promises")
Promise.all(promises).then(ready)
	
function ready([us]) {
	
  svg.append("g")
      .attr("class", "states")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.states).features)
    .enter().append("path")
      .attr("d", path)
      .attr("fill", function(d) {
      	console.log("d", d)
      })

  svg.append("path")
      .attr("class", "state-borders")
      .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })));
}