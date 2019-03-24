const ifMiddleCellIsOpen = function (arrs) {
    if (arrs[1][1] === '') {
        arrs[1][1] = 'O'
    }
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

const ifOneDiagLineAlternating = function (arrs) {
    if ((arrs[0][0] === 'X' && arrs[1][1] === 'O' && arrs[2][2] === 'X') || (arrs[0][2] === 'X' && arrs[1][1] === 'O' && arrs[2][0] === 'X')) {
        const randomMiddleNumber = generateRandomMiddleNumber()
        const [arrIndexI, arrIndexJ] = convertNormalIndexToArrayIndex(randomMiddleNumber)
        arrs[arrIndexI][arrIndexJ] = 'O'
    }
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
        console.log('arrIndexI', arrIndexI)
        console.log('arrIndexJ', arrIndexJ)
        if (
            arrs[arrIndexI - 1][arrIndexJ] === 'X' ||
            arrs[arrIndexI][arrIndexJ - 1] === 'X' ||
            arrs[arrIndexI + 1][arrIndexJ] === 'X' ||
            arrs[arrIndexI][arrIndexJ + 1] === 'X') {
            arrs[arrIndexI][arrIndexJ] = 'O'
        }
    }
}

module.exports = {
    ifMiddleCellIsOpen,
    ifMiddleTaken,
    ifTwoXsAndEmptyCell,
    ifOneDiagLineAlternating,
    ifOneDiagLineXXO,
    ifTwoXOnEdgeOneOInMiddle
}