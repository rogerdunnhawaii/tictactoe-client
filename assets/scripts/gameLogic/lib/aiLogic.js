const isAllCellsTaken = (arrs) => {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (arrs[i][j] == '') {
                return false
            }
        }
    }
    return true
}

const checkWinner = (arrs) => {

    // get all possible coordiantes
    // get all poissible elements lines

    let allPossibleLines = generateAllPossibleCoordinatesOfLines()
    let allElementsInLines = allPossibleLines.map((line) => {
        let elementsInLine = getElementsOfLine(arrs, line)
        return elementsInLine
    })

    for (let i = 0; i < allElementsInLines.length; i++) {
        let line = allElementsInLines[i];
        let firstElement = line[0]
        if (firstElement == '') {
            continue
        }
        let win = true
        for (let j = 1; j < line.length; j++) {
            let currentElement = line[j]
            if (currentElement != firstElement) {
                win = false
            }
        }
        if (win) {
            return firstElement
        }
    }

    return false
}

// return the corner player2 should not go
const isTwoPlayer1InMiddleEdgeNearEachOtherAndPlayer2AtCenter = (arrs, player1, player2) => {

    // player1 in either of 4 cases:
    // [[1,0], [2,1]]
    // [[1,2], [2,1]]
    // [[1,2], [0,1]]
    // [[1,0], [0,1]]
    // and player2 in [1,1]

    if (arrs[1][1] !== player2) {
        return false
    }

    if (arrs[1][0] == player1 && arrs[1][0] == arrs[2][1]) {
        return [0,2]
    }

    if (arrs[1][2] == player1 && arrs[1][2] == arrs[2][1]) {
        return [0,0]
    }

    if (arrs[1][2] == player1 && arrs[1][2] == arrs[0][1]) {
        return [2,0]
    }

    if (arrs[1][0] == player1 && arrs[1][0] == arrs[0][1]) {
        return [2,2]
    }

    return false
}

const isTwoPlayer1TogetherAndOnePlayer2InOneLineDiagnally = function (arrs, player1, player2) {

    let line1 = [[0, 0], [1, 1], [2, 2]]
    let line2 = [[0, 2], [1, 1], [2, 0]]
    let allDiagLines = [
        line1,
        line2
    ]

    let found = false
    for (let i = 0; i < allDiagLines.length; i++) {
        let line = allDiagLines[i]
        let elementsOfLine = getElementsOfLine(arrs, line)
        if (isAllCellsTakenInLine(elementsOfLine) &&
            isNumOfPlayersExistInLine(elementsOfLine, player1, 2, player2, 1) &&
            !isElementsAlternating(elementsOfLine)) {
            found = true
            break
        }
    }

    return found
}

// check al
// precondition: elements are full, not empty cells
const isElementsAlternating = (elements) => {

    // X 0 X
    // o x o
    // let startPlayer = elements[i]
    // let oppositePlayer = getOppositePlayer(startPlayer)

    let isAlternating = true
    for (let i = 0; i < elements.length - 1; i++) {
        if (elements[i] === elements[i + 1]) {
            isAlternating = false
        }
    }

    return isAlternating
}

const getOppositePlayer = (player) => {
    if (player == "X") return "O"
    else if (player == "O") return "X"
    else throw new Error("player has to be X or O")
}

const isNumOfPlayersExistInLine = (elements, player1, player1ExpectedNum, player2, player2ExpectedNum) => {
    let numOfPlayer1 = getNumOfPlayerInLine(elements, player1)
    let numOfPlayer2 = getNumOfPlayerInLine(elements, player2)

    if (numOfPlayer1 == player1ExpectedNum && numOfPlayer2 == player2ExpectedNum) {
        return true
    }

    return false
}

const getNumOfPlayerInLine = (elements, player) => {
    let num = 0
    for (let i = 0; i < elements.length; i++) {
        if (elements[i] == player) {
            num++
        }
    }
    return num
}

const isAllCellsTakenInLine = function (elements) {
    let numOfEmptyCell = 0
    for (let i = 0; i < elements.length; i++) {
        if (elements[i] == '') {
            numOfEmptyCell++
        }
    }
    if (numOfEmptyCell == 0) {
        return true
    }
    return false
}

const ifMiddleCellIsOpen = function (arrs) {
    if (arrs[1][1] === '') {
        arrs[1][1] = 'O'
    }
    return arrs
}

const isMiddleCellOpen = function (arrs) {
    if (arrs[1][1] === '') {
        return true;
    }
    return false;
}

const ifMiddleTaken = function (arrs) {
    if (arrs[1][1] === 'X') {
        const randomCornerNumber = generateRandomCornerNumber()
        const [arrIndexI, arrIndexJ] = convertNormalIndexToArrayIndex(randomCornerNumber)
        arrs[arrIndexI][arrIndexJ] = 'O'
    }
}

const ifTwoXsAndEmptyCell = function (arrs) {
    let countOfO = 0
    let countOfX = 0
    let countOfBlank = 0
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (arrs[0][j] === 'X') {
                countOfX++
            } else if (arrs[0][j] === 'O') {
                countOfO++
            } else {
                countOfBlank++
            }
            // code for row 1 (if this is the correct approach I need to do this for 8 possibilities, is there a DRYer way?)
            if (countOfX === 2 && countOfBlank === 1 && countOfO === 0) {
                for (let j = 0; j < 3; j++) {
                    if (arrs[0][j] === '') {
                        arrs[0][j] = 'O'
                    }
                }
            }
        }
    }
}




const isTwoPlayerExistInRowHoriOrVerOrDiagnal = function (arrs, player) {

    // generate all possible indexes 

    let allPossibleIndexes = generateAllPossibleCoordinatesOfLines();
    let found = false;
    let emptyCellIndex = null
    for (let i = 0; i < allPossibleIndexes.length; i++) {
        let currentIndexArr = allPossibleIndexes[i];
        let foundResult = isElementsInLineTwoOfPlayerAndThirdIsEmpty(arrs, currentIndexArr, player)
        if (foundResult) {
            found = true

            // find the empty cell XY
            emptyCellIndex = foundResult
        }
    }

    if (!found) {
        return false
    } else {
        return emptyCellIndex
    }

}

const generateAllPossibleCoordinatesOfLines = function () {

    let allPossibleIndexes = [];
    for (let i = 0; i < 3; i++) {
        let currentIndexArray = []
        for (let j = 0; j < 3; j++) {
            currentIndexArray.push([i, j])
        }
        allPossibleIndexes.push(currentIndexArray)
    }

    for (let j = 0; j < 3; j++) {
        let currentIndexArray = []
        for (let i = 0; i < 3; i++) {
            currentIndexArray.push([i, j])
        }
        allPossibleIndexes.push(currentIndexArray)
    }

    allPossibleIndexes.push([[0, 0], [1, 1], [2, 2]]);
    allPossibleIndexes.push([[0, 2], [1, 1], [2, 0]]);

    return allPossibleIndexes;
}

// player: X or O, X usally
const isElementsInLineTwoOfPlayerAndThirdIsEmpty = function (arrs, coordinates, player) {

    // console.log(arrs);
    // get elements from those indexes
    if (coordinates.length !== 3) {
        throw new Error("indexes should have 3 elements")
    }
    let elementsOfLine = getElementsOfLine(arrs, coordinates);

    let numOfPlayerInLine = 0;
    let numOfEmptyCell = 0;
    let emptyCellXY = null
    for (let i = 0; i < elementsOfLine.length; i++) {
        if (elementsOfLine[i] == player) {
            numOfPlayerInLine++
        } else if (elementsOfLine[i] == '') {
            numOfEmptyCell++;
            // indexes[i]
            // console.log(indexes[i]);
            emptyCellXY = coordinates[i]
        }
    }

    if (numOfPlayerInLine == 2 && numOfEmptyCell == 1) {
        return emptyCellXY
    }

    return false
}

// precondition: one of the corner is not taken
const putPlayerInCorner = function (arrs, player, cornerNotPut) {
    // loop: get a random coordinate for one of the corners
    // if the coordinate is open, break the loop
    let coordinate = null
    while (true) {
        coordinate = generateRandomCornerCoordinate()
        if (cornerNotPut !== undefined && cornerNotPut[0] == coordinate[0] &&
            cornerNotPut[1] == coordinate[1]
            ) {
            continue
        }
        if (isCoordinateOpen(arrs, coordinate[0], coordinate[1])) {
            break
        }
        console.log('in loop');
    }

    arrs[coordinate[0]][coordinate[1]] = player
    return arrs
}

const isAll4CornerTaken = function (arrs) {
    if (
        arrs[0][0] !== '' &&
        arrs[0][2] !== '' &&
        arrs[2][0] !== '' &&
        arrs[2][2] !== ''
    ) {
        return true
    }

    return false
}

// convert an array of coordinates to an array of real elements (X, O)
const getElementsOfLine = function (arrs, coordinates) {
    let elementsOfLine = [];

    // get each element and put them in a array
    for (let i = 0; i < 3; i++) {
        let currentIndexes = coordinates[i];
        let currentElement = arrs[currentIndexes[0]][currentIndexes[1]]
        elementsOfLine.push(currentElement)
    }

    return elementsOfLine;
}

const ifOneDiagLineAlternating = function (arrs) {
    if ((arrs[0][0] === 'X' && arrs[1][1] === 'O' && arrs[2][2] === 'X') || (arrs[0][2] === 'X' && arrs[1][1] === 'O' && arrs[2][0] === 'X')) {
        const randomMiddleNumber = generateRandomMiddleNumber()
        const [arrIndexI, arrIndexJ] = convertNormalIndexToArrayIndex(randomMiddleNumber)
        arrs[arrIndexI][arrIndexJ] = 'O'
    }
}

const putPlayerInMiddleEdge = function (arrs, player) {

    // loop: if taken, generate a new coordinate
    // until the coordinate is not token
    let x
    let y
    while (true) {
        // random will always be 1,3,5,7
        const randomMiddleNumber = generateRandomMiddleNumber()
        x = convertNormalIndexToArrayIndex(randomMiddleNumber)[0]
        y = convertNormalIndexToArrayIndex(randomMiddleNumber)[1]

        if (isCoordinateOpen(arrs, x, y)) {
            break;
        }

    }

    arrs[x][y] = player
    return arrs
}

const isAll4EdgesAreTaken = function (arrs) {
    if (
        arrs[0][1] != '' &&
        arrs[1][0] != '' &&
        arrs[1][2] != '' &&
        arrs[2][1] != ''
    ) {
        return true;
    }
    return false;
}

const isCoordinateOpen = function (arrs, coordinateX, coordinateY) {
    let content = arrs[coordinateX][coordinateY]
    if (content == '') {
        return true
    }

    return false
}

const isDiagnalAlternating = function (arrs) {
    if ((arrs[0][0] === 'X' && arrs[1][1] === 'O' && arrs[2][2] === 'X')
        || (arrs[0][2] === 'X' && arrs[1][1] === 'O' && arrs[2][0] === 'X')) {
        return true;
    }
    return false;
}

const isCrossAlternating = function (arrs) {
    if ((arrs[0][1] === 'X' && arrs[1][1] === 'O' && arrs[2][1] === 'X')
        || (arrs[1][0] === 'X' && arrs[1][1] === 'O' && arrs[1][2] === 'X')) {
        return true;
    }
    return false;
}

const ifOneDiagLineXXO = function (arrs) {
    if ((arrs[0][0] === 'X' && arrs[1][1] === 'X' && arrs[2][2] === 'O') || (arrs[0][2] === 'X' && arrs[1][1] === 'X' && arrs[2][0] === 'O') || (arrs[0][2] === 'O' && arrs[1][1] === 'X' && arrs[2][0] === 'X') || (arrs[0][0] === 'O' && arrs[1][1] === 'X' && arrs[2][2] === 'X')) {
        const randomCornerNumber = generateRandomCornerNumber()
        const [arrIndexI, arrIndexJ] = convertNormalIndexToArrayIndex(randomCornerNumber)
        arrs[arrIndexI][arrIndexJ] = 'O'
    }
}

const ifTwoXOnEdgeOneOInMiddle = function (arrs) {
    if ((arrs[0][1] === 'X' && arrs[1][1] === 'O' && arrs[1][0] === 'X') || (arrs[1][0] === 'X' && arrs[1][1] === 'O' && arrs[2][1] === 'X') || (arrs[2][1] === 'X' && arrs[1][1] === 'O' && arrs[1][2] === 'X') || (arrs[1][2] === 'X' && arrs[1][1] === 'O' && arrs[0][1] === 'X')) {
        const randomCornerNumber = generateRandomCornerNumber()
        const [arrIndexI, arrIndexJ] = convertNormalIndexToArrayIndex(randomCornerNumber)
        // console.log('arrIndexI', arrIndexI)
        // console.log('arrIndexJ', arrIndexJ)
        if (
            arrs[arrIndexI - 1][arrIndexJ] === 'X' ||
            arrs[arrIndexI][arrIndexJ - 1] === 'X' ||
            arrs[arrIndexI + 1][arrIndexJ] === 'X' ||
            arrs[arrIndexI][arrIndexJ + 1] === 'X') {
            arrs[arrIndexI][arrIndexJ] = 'O'
        }
    }
}

const generateRandomMiddleNumber = () => {
    const middleArray = [1, 3, 5, 7]
    const randomMiddleEdge = middleArray[Math.floor(Math.random() * middleArray.length)]
    return randomMiddleEdge
}

const generateRandomCornerNumber = () => {
    const cornerArray = [0, 2, 6, 8]
    const randomCorner = cornerArray[Math.floor(Math.random() * cornerArray.length)]
    return randomCorner
}

const generateRandomCornerCoordinate = () => {
    let randomNumber = generateRandomCornerNumber()
    let coordinate = convertNormalIndexToArrayIndex(randomNumber)
    return coordinate
}

const convertNormalIndexToArrayIndex = function (normalIndex) {
    const i = Math.floor(normalIndex / 3)
    const j = normalIndex % 3

    return [i, j]
}


module.exports = {
    ifMiddleCellIsOpen,
    isMiddleCellOpen,
    ifMiddleTaken,
    ifTwoXsAndEmptyCell,
    ifOneDiagLineAlternating,
    ifOneDiagLineXXO,
    ifTwoXOnEdgeOneOInMiddle,
    isTwoPlayerExistInRowHoriOrVerOrDiagnal,
    isElementsInLineTwoOfPlayerAndThirdIsEmpty,
    isDiagnalAlternating,
    isCrossAlternating,
    putPlayerInMiddleEdge,
    convertNormalIndexToArrayIndex,
    isAll4EdgesAreTaken,
    putPlayerInCorner,
    isAll4CornerTaken,
    isCoordinateOpen,
    isTwoPlayer1TogetherAndOnePlayer2InOneLineDiagnally,
    isTwoPlayer1InMiddleEdgeNearEachOtherAndPlayer2AtCenter,
    checkWinner,
    isAllCellsTaken
}