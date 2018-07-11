var canvas = d3.select("canvas").call(d3.zoom().scaleExtent([1, 8]).on("zoom", zoom));
var search_input = document.getElementById("search");
var    context = canvas.node().getContext("2d");
var    width = canvas.property("width");
var    height = canvas.property("height");

var currentScale = 1.0;
var randomX = d3.randomNormal(width / 2, 80);
var randomY = d3.randomNormal(height / 2, 80);
var data = [
      {
          "user_id": 1,
          "first_name": "Pelle",
          "last_name": "Pärson",
          "track_name": "SkaparstudioBarn"
      },
      {
          "user_id": 2,
          "first_name": "Anna",
          "last_name": "Eriksson",
          "track_name": "Unity"
      },
      {
          "user_id": 3,
          "first_name": "Erik",
          "last_name": "Karlsson",
          "track_name": "Minecraft"
      },
      {
          "user_id": 4,
          "first_name": "Filip",
          "last_name": "Philipsson",
          "track_name": "Python"
      },
      {
          "user_id": 5,
          "first_name": "Karin",
          "last_name": "Karlsdotter",
          "track_name": "Webb"
      },
      {
          "user_id": 6,
          "first_name": "Albin",
          "last_name": "Byström",
          "track_name": "Webb"
      }
  ];


var listOfStars = [];
var numberOfStars = 2 * data.length;
/*for (var i = 0; i < numberOfStars; i++) {
  var star = {};
  //  Math.seedrandom(data[i]["first_name"] + data[i]["track_name"]);
  star['x'] = 0;//random() * width;
  star['y'] =  0;//random() * height;
  star['size'] = Math.random() * size + minSize;
  star['id'] = i;
  //var img = document.getElementById("star");
  listOfStars.push(star);
}*/

listOfStars = generateStarCoordinets(
  data.length,
  test_constellation,
  { x : width / 2, y : height / 2 }, 
  150,
  0
);

console.log(listOfStars);
draw();

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
  var i = -1, n = listOfStars.length, d;
  context.beginPath();
  while (++i < n) {
    d = listOfStars[i];
    context.moveTo(d["x"], d["y"])

    // Draw stars on screen
    context.arc(d["x"], d["y"], 2, 0, 2 * Math.PI);

    if(currentScale > 2){
      //context.drawImage(card, d["x"]*200, d["y"]*200 - (card.height / card.width) * 100 , 100, (card.height / card.width) * 100);
      context.fillText(data[i % data.length]["first_name"], d["x"]- 10, d["y"] - 20);
    }

  }
  context.fill();
}

function search(name){
  // find name
  for (var i = 0; i < data.length; i++) {
    if(data[i]["first_name"] == name){
      // move to point
      const t = d3.zoomIdentity.translate(width/2 - listOfStars[i]["x"]*200, height/2 - listOfStars[i]["y"]*200).scale(3);
      console.log(d3.zoom().transform );
      canvas.transition()
        .duration(10)
        .call( d3.zoom().transform, t ); // updated for d3 v4

      draw();

    }
  }
}

search_input.addEventListener('keyup', function(){
  search(search_input.value);
  draw();
})
