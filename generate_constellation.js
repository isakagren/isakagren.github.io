var test_constellation = {
    nodes: [
        { x: 0, y: 0},
        { x: 1, y: 0},
        { x: 1, y: 1},
        { x: 0, y: 1},
        { x: -1, y: -0.25},
        { x: -2, y: 0}
    ],
    paths: [
        { start: 1, end: 2},
        { start: 2, end: 3},
        { start: 0, end: 4},
        { start: 0, end: 3},
        { start: 4, end: 5},
        { start: 0, end: 1}
    ]
};


var test_constellation2 = {
    nodes: [
        { id: 0, x: 0, y: 0},
        { id: 1, x: 0.5, y: 0},
        { id: 2, x: 0.5, y: 0.5},
        { id: 3, x: 1.2, y: 1.5},
        { id: 4, x: 1, y: -0.25},
        { id: 5, x: 3, y: -0.5},
        { id: 6, x: 2.75, y: -1.2},
        { id: 7, x: 3.25, y: 0.2}
    ],
    paths: [
        { id: 0, start: 0, end: 1},
        { id: 1, start: 1, end: 2},
        { id: 2, start: 2, end: 3},
        { id: 3, start: 1, end: 4},
        { id: 4, start: 4, end: 5},
        { id: 4, start: 5, end: 6},
        { id: 4, start: 5, end: 7}
    ]
};

var test_constellation3 = {
    nodes: [
        { id: 0, x: 0, y: 0},
        { id: 1, x: 1, y: -0.1},
        { id: 2, x: 1.5, y: 3},
        { id: 3, x: 0.7, y: 3.5},
        { id: 4, x: -0.3, y: 2}
    ],
    paths: [
        { id: 0, start: 0, end: 1},
        { id: 1, start: 1, end: 2},
        { id: 2, start: 2, end: 3},
        { id: 3, start: 3, end: 4},
        { id: 4, start: 4, end: 0}
    ]
};



function generateStarCoordinets (numberOfStars, constellation, offset, scale, wobble, angle) {

    var generatedStars = []

    // Fill the fixed nodes
    for (var i = 0; i < numberOfStars && i < constellation.nodes.length; i++)
        generatedStars.push( {
            x: constellation.nodes[i].x,
            y: constellation.nodes[i].y
        } )

    var remaningStars = numberOfStars - generatedStars.length

    // fill the lines between stars
    for (var i = 0; i < constellation.paths.length; i++) {
        var path = constellation.paths[i]

        var starsOnThisPath = Math.floor(remaningStars / constellation.paths.length) + (i < remaningStars % constellation.paths.length)

        for (var j = 1; j < starsOnThisPath + 1; j++) {
            var deltaX = constellation.nodes[path.end].x - constellation.nodes[path.start].x
            var deltaY = constellation.nodes[path.end].y - constellation.nodes[path.start].y
            var coords = {
                x : constellation.nodes[path.start].x + (deltaX * j / (starsOnThisPath + 1)),
                y : constellation.nodes[path.start].y + (deltaY * j / (starsOnThisPath + 1))
            }

            generatedStars.push(coords)
        }
    }

    // Move stars according to scale. offset and wobble
    var movedStars = generatedStars
        .map( coord => { return { x : coord.x * Math.cos(angle) - coord.y * Math.sin(angle), y: coord.x * Math.sin(angle) + coord.y * Math.cos(angle)} })
        .map( coord => { return { x : coord.x * scale, y : coord.y * scale }} )
        .map( coord => { return { x : coord.x + offset.x, y : coord.y + offset.y }} )
        .map( coord => { return { x : coord.x + Math.random() * wobble, y : coord.y + Math.random() * wobble }} )

    var paths = []
    for (var i = 0; i < constellation.paths.length; i++) {
        var path = constellation.paths[i]
        if (movedStars[path.start] && movedStars[path.end])
            paths.push({start: movedStars[path.start], end: movedStars[path.end]})
    }

    return {
        stars: movedStars,
        paths: paths
    }
}
