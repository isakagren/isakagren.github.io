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


var test_constellation2 = {
    nodes: [
        { id: 0, x: 0, y: 0},
        { id: 1, x: 0.5, y: 0},
        { id: 2, x: 0.5, y: 0.5},
        { id: 3, x: 1.2, y: 1.5},
        { id: 4, x: 1, y: -0.25},
        { id: 5, x: 3, y: -0.5},
        { id: 6, x: 2.75, y: -1.2},
        { id: 6, x: 3.25, y: 0.2}
    ],
    paths: [
        { id: 1, start: 1, end: 2},
        { id: 2, start: 2, end: 3},
        { id: 3, start: 1, end: 3},
        { id: 0, start: 0, end: 1}
    ]
};


function generateStarCoordinets (numberOfStars, constellation, offset, scale, wobble) {

    var generatedStars = []

    // Fill the fixed nodes
    for (i = 0; i < numberOfStars && i < constellation.nodes.length; i++)
        generatedStars.push( {
            x: constellation.nodes[i].x,
            y: constellation.nodes[i].y
        } )


    // fill the lines between stars
    for (i = 0; i < constellation.paths.length; i++) {
        var path = constellation.paths[i]
        var remaningStars = numberOfStars - generatedStars.length
        var starsOnThisPath = Math.floor(remaningStars / constellation.paths.length) + (i < remaningStars % constellation.paths.length)

        for (j = 1; j < starsOnThisPath + 1; j++) {
            var deltaX = constellation.nodes[path.end].x - constellation.nodes[path.start].x
            var deltaY = constellation.nodes[path.end].y - constellation.nodes[path.start].y
            var coords = {
                x : constellation.nodes[path.start].x + (deltaX * j / (starsOnThisPath + 1)),
                y : constellation.nodes[path.start].y + (deltaY * j / (starsOnThisPath + 1))
            }
            console.log(i, j, deltaX, deltaY, coords)

            generatedStars.push(coords)
        }
    }


    // Move stars according to scale. offset and wobble
    var movedStars = generatedStars
        .map( coord => { return { x : coord.x * scale, y : coord.y * scale }} )
        .map( coord => { return { x : coord.x + offset.x, y : coord.y + offset.y }} )
        .map( coord => { return { x : coord.x + Math.random() * wobble, y : coord.y + Math.random() * wobble }} )

    return movedStars
}
