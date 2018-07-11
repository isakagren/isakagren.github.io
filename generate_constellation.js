var test_constellation = {
    nodes: [
        { id: 0, x: 0, y: 0},
        { id: 1, x: 1, y: 0},
        { id: 2, x: 1, y: 1},
        { id: 3, x: 0, y: 1},
        { id: 4, x: -1, y: -0.25},
        { id: 5, x: -2, y: 0}
    ],
    paths: [
        { id: 1, start: 1, end: 2},
        { id: 2, start: 2, end: 3},
        { id: 3, start: 1, end: 3},
        { id: 0, start: 0, end: 1}
    ]
};

function generateStarCoordinets (numberOfStars, constellation, x, y, scale) {

    var generatedStars = [];

    // Fill the fixed nodes
    for (i = 0; i < numberOfStars && i < constellation.nodes.length; i++)
        generatedStars.push( {
            x: constellation.nodes[i].x * scale + x,
            y: constellation.nodes[i].y * scale + y
        } )


    // fill the lines between stars
    for (i = 0; i < constellation.paths.length; i++) {
        var path = constellation.paths[i];
        var remaningStars = numberOfStars - generatedStars.length;
        var starsOnThisPath = Math.floor(remaningStars / constellation.paths.length) + (i < remaningStars % constellation.paths.length);

        for (j = 1; j < remaningStars + 1; j++) {
            var deltaX = constellation.nodes[path.end].x - constellation.nodes[path.start].x;  // Dessa rader är inkorrekta, ska ta node med id: k, inte node[k]
            var deltaY = constellation.nodes[path.end].y - constellation.nodes[path.start].y;
            var coords = {
                x : (constellation.nodes[path.start].x + (deltaX * j / (starsOnThisPath + 1))) * scale + x,
                y : (constellation.nodes[path.start].y + (deltaY * j / (starsOnThisPath + 1))) * scale + y
            };
            //console.log(i, j, deltaX, deltaY, coords);

            generatedStars.push(coords);
        }
    }

    return generatedStars;
}

console.log(generateStarCoordinets( 8, test_constellation));
