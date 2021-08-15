var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");
    
var laws;

var path = d3.geoPath();

var states;
var borders;
var lawsToFill = [];

const state_id = 
{"01": "Alabama", "02": "Alaska", "04": "Arizona", "05": "Arkansas", "06": "California", "08": "Colorado", "09": "Connecticut",  "10": "Delaware", "12": "Florida", "13": "Georgia", "15": "Hawaii", "16": "Idaho", "17": "Illinois", "18": "Indiana", "19": "Iowa", "20": "Kansas", "21": "Kentucky", "22": "Louisiana", "23": "Maine", "24": "Maryland", "25": "Massachusetts", "26": "Michigan", "27": "Minnesota", "28": "Mississippi", "29": "Missouri", "30": "Montana", "31": "Nebraska", "32": "Nevada", "33": "New Hampshire", "34": "New Jersey", "35": "New Mexico", "36": "New York", "37": "North Carolina", "38": "North Dakota", "39": "Ohio", "40": "Oklahoma", "41": "Oregon", "42": "Pennsylvania", "44": "Rhode Island", "45": "South Carolina", "46": "South Dakota", "47": "Tennessee", "48": "Texas", "49": "Utah", "50": "Vermont", "51": "Virginia", "53": "Washington", "54": "West Virginia", "55": "Wisconsin", "56": "Wyoming"}

var promises = [
d3.json("https://d3js.org/us-10m.v1.json"),
d3.csv("envstate.csv").then(function(d) {
	laws = d;
	console.log(laws)
})
]

console.log("before promises")
Promise.all(promises).then(ready)
	
function ready([us]) {

  //  d3.selectAll("input")
		
		
  states = svg.append("g")
      .attr("class", "states")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.states).features)
    .enter().append("path")
    .attr("d", path)
    .attr("fill", "gray")
    .on("click", function(d) {
    	d3.selectAll("p").remove()
    	d3.selectAll("h3").remove()
    	var currentState = state_id[d.id]
    	var currentStateTogether=currentState.replace(/\s/g, "")
    	d3.selectAll('.' + currentStateTogether).append('h3').text("Environmental Laws in " + currentState + ":")
    	currentState = state_id[d.id]
    	for (var i=0; i<laws.length; i++) {
    		if (laws[i].state == currentState) {
    			var appendLink = d3.selectAll('.' + currentStateTogether).append('p')
    			appendLink.append('a')
    			.text(laws[i].title)
    			.attr("href", laws[i].sources)
    		}
    	}
		})
    
  borders = svg.append("path")
      .attr("class", "state-borders")
      .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })));
      
  
    // plan for tomorrow:
    // event listener on all the law buttons (done)
    // for a change on a button, fetch label (done)
    // parse through laws to find objects with title that match label (done)
    // fetch states from objects (done)
    // match to state ids
    // pull state ids from svg and fill ones that match
    

}