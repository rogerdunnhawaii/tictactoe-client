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

const isTwoXExistInRowHoriOrVerOrDiagnal = function (arrs) {

    // generate all possible indexes 

    let allPossibleIndexes = generateAllPossibleIndexes();
    let found = false;
    let emptyCellIndex = null
    for (let i = 0; i < allPossibleIndexes.length; i++) {
        let currentIndexArr = allPossibleIndexes[i];
        let foundResult = isElementsInLineTwoOfPlayerAndThirdIsEmpty(arrs, currentIndexArr, 'X')
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

const generateAllPossibleIndexes = function () {

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
const isElementsInLineTwoOfPlayerAndThirdIsEmpty = function (arrs, indexes, player) {

    // console.log(arrs);
    // get elements from those indexes
    if (indexes.length !== 3) {
        throw new Error("indexes should have 3 elements")
    }
    let elementsOfLine = getElementsOfLine(arrs, indexes);
    // console.log(indexes);

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
            emptyCellXY = indexes[i]
        }
    }

    if (numOfPlayerInLine == 2 && numOfEmptyCell == 1) {
        return emptyCellXY
    }

    return false
}


const getElementsOfLine = function (arrs, indexes) {
    let elementsOfLine = [];

    // get each element and put them in a array
    for (let i = 0; i < 3; i++) {
        let currentIndexes = indexes[i];
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
    const randomMiddleNumber = generateRandomMiddleNumber()
    console.log(randomMiddleNumber);
    const [arrIndexI, arrIndexJ] = convertNormalIndexToArrayIndex(randomMiddleNumber)
    console.log(convertNormalIndexToArrayIndex(randomMiddleNumber));
    arrs[arrIndexI][arrIndexJ] = player
    return arrs;
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
    isTwoXExistInRowHoriOrVerOrDiagnal,
    isElementsInLineTwoOfPlayerAndThirdIsEmpty,
    isDiagnalAlternating,
    isCrossAlternating,
    putPlayerInMiddleEdge,
    convertNormalIndexToArrayIndex
}