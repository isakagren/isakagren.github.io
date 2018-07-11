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


function generateStarCoordinets (numberOfStars, constellation, offset, scale, wobble) {
    
    var generatedStars = []

    // Fill the fixed nodes
    for (i = 0; i < numberOfStars && i < constellation.nodes.length; i++)
        generatedStars.push( {
            x: constellation.nodes[i].x,
            y: constellation.nodes[i].y
        } )
    
        var remaningStars = numberOfStars - generatedStars.length
    
    // fill the lines between stars
    for (i = 0; i < constellation.paths.length; i++) {
        var path = constellation.paths[i]
        
        var starsOnThisPath = Math.floor(remaningStars / constellation.paths.length) + (i < remaningStars % constellation.paths.length)
        console.log(starsOnThisPath, remaningStars)
        
        for (j = 1; j < starsOnThisPath + 1; j++) {
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
        .map( coord => { return { x : coord.x * scale, y : coord.y * scale }} )
        .map( coord => { return { x : coord.x + offset.x, y : coord.y + offset.y }} )
        .map( coord => { return { x : coord.x + Math.random() * wobble, y : coord.y + Math.random() * wobble }} )

    return movedStars
}

