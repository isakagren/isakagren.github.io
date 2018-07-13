var canvas = d3.select("canvas")
    .call(d3.zoom()
    .scaleExtent([0.01, 8])  // Zoom range for canvas
    .on("zoom", zoom)
  );

var search_input = document.getElementById("search");

var context = canvas.node().getContext("2d");

var width = canvas.property("width");
var height = canvas.property("height");

var currentScale = 1.0;

// Offest between stars
var offsetX = 40;
var offsetY = -20;


var randomX = d3.randomNormal(width / 2, width / 4);
var randomY = d3.randomNormal(height / 2, height / 4);

var listOfStars = [];
var listOfPaths = [];

var starData = {};
var numberOfStars = 1000;//data.length;

window.onload = function(){
  var j = 0;
  while ( j < data.length / 4 ) {
    var constellation = newConstellation();

    starData = generateStarCoordinets(
      constellation.nodes.length,
      constellation,
      { x :Math.random()*width, y : Math.random()*height},
      100 + 50 * Math.random(),
      10,
      2*Math.PI * Math.random()
    );

    var place = true;
    for (var i = 0; i < constellation.nodes.length; i++) {
      if(!canPlace(starData.stars[i])){
        place = false;
      }
    }
    if (place) {
      listOfStars = listOfStars.concat(starData.stars);
      listOfPaths = listOfPaths.concat(starData.paths);
      j += constellation.nodes.length;
    }
  }
  while ( j < numberOfStars) {
      var star = {};
      star.x = randomX();
      star.y = randomY();
      if(canPlace(star)){
        listOfStars.push(star);
        j++;
      }
  }
  draw();
};



function zoom() {
    var transform = d3.event.transform;
    context.save();
    context.clearRect(0, 0, width, height);
    context.translate(transform.x, transform.y);
    //console.log(transform.k);
    context.scale(transform.k, transform.k);
    currentScale = transform.k;
    draw();
    context.restore();
}



function draw() {
  drawLines();
  drawStars();
}

function drawStars(){
  context.beginPath();
  for(var i = 0; i < listOfStars.length; i++) {
    var d = listOfStars[i];
    // Move context to draw point
    context.moveTo(d["x"], d["y"])
    // Draw stars on screen
    if(currentScale > 0.8){
      context.arc(d["x"], d["y"], 2, 0, 2 * Math.PI);
    }
    else{
      context.arc(d["x"], d["y"], 5 / currentScale, 0, 2 * Math.PI);
      context.fillStyle = "#edeeef";
    }

    // Print first name if zoomed in
    if(currentScale > 2){
      // Center name text
      context.textAlign="center";
      // Print text above the star
      context.fillText(
        data[i % data.length]["first_name"],
        d["x"],
        d["y"] - 10 // 10 is offset to the star
      );
    }
  }
  // Fill canvas
  context.fill();
}

function drawLines() {
    // Draw all lines in an constellation
    context.beginPath();
    for (var i = 0; i < listOfPaths.length; i++) {
      var path = listOfPaths[i];
      // Start point of line
      context.moveTo(path.start.x, path.start.y);
      // End point of line
      context.lineTo(path.end.x, path.end.y);
      // Color of line
      context.strokeStyle = "#edeeef";
      // Thickness if line
      context.lineWidth = 1.5;
    }
    // Draw lines
    context.stroke();
}

// Input: name to search for
// Goal: to center searched star in center of screen
// NOTE: Not finnished. Need to figure out how to move viewport to the correct
// location
function search(name){
  // Linerar seacrh for name, could be optimized with binnary search but
  // for now length of data is around 200
  for (var i = 0; i < data.length; i++) {
    if(data[i]["first_name"] == name){
      // If name is found then move viewport so that corresponding star is in center
      const t = d3.zoomIdentity.translate(
        width/2 - listOfStars[i]["x"]*200,  // X value
        height/2 - listOfStars[i]["y"]*200  // Y value
      ).scale(3);                           // Zoom value

      canvas.transition()
        .duration(10)
        .call( d3.zoom().transform, t ); // updated for d3 v4

      draw();
    }
  }
}

// Add event lisenter to canvas
search_input.addEventListener('keyup', function(){
  search(search_input.value);
  draw();
})

// Return a constellation from a pre defined set of constellations
function newConstellation(){
  var rand = Math.floor(Math.random() * 3);
  if(rand == 1){
    return test_constellation;
  }
  else if(rand == 2){
    return test_constellation2;
  }
  else {
    return test_constellation3;
  }
}

// Input: star to check if it overlaps with other stars
// Return ture if no prev placed stars over lap, otherwise falss
function canPlace(star){
  // Linear search for overlapping stars. Could be optimized with a sweep
  // algorithm.
  for (var i = 0; i < listOfStars.length; i++) {
    if(star.x > listOfStars[i].x - offsetX &&
       star.x < listOfStars[i].x + offsetX &&
       star.y < listOfStars[i].y - offsetY &&
       star.y > listOfStars[i].y + offsetY
     ){
      return false;
    }
  }
  return true;
}
