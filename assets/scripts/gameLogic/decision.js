const store = require('../store')

const alreadyHasAValue = function (store, cellId) {
  const gameBoard = store.game.cells
  if (gameBoard === 'undefined') {
    $('#Message').text('Please sign up or sign in')
  }
  if (gameBoard[cellId] === 'x' || gameBoard[cellId] === 'o') {
    $('#Message').text('Choose a different cell')
    return true
  } else {
    return false
  }
}

const determineValue = function (cellId) {
  if (store.lastmove === 'x') {
    store.lastmove = 'o'
  } else {
    store.lastmove = 'x'
  }
}

const movesSoFar = function (store) {
  const cells = store.game.cells
  let count = 0
  for (let i = 0; i < cells.length; i++) {
    if (cells[i] === 'x' || cells[i] === 'o') {
      count++
    }
  }
  return count
}

const clickBox = function (cellId, xOrO) {
  store.game.cells[cellId] = xOrO
}

const countClicks = function () {
  const turnNum = ++store.turn
  return turnNum
}

const isTied = function (turns) {
  if (turns === 9) {
    store.game.over = true
    $('#Message').empty().append('Game is Tied')
  }
}

const isWinner = function (cellId, xOrO) {
  if (xOrO === 'x') {
    // cell[0]
    if (cellId === '0') {
      store.sumOfRow1 += 1
      store.sumOfCol1 += 1
      store.sumOfDiag += 1
    // cell[1]
    } else if (cellId === '1') {
      ++store.sumOfRow1
      ++store.sumOfCol2
    } else if (cellId === '2') {
      store.sumOfRow1++
      store.sumOfCol3++
      store.sumOfAntiDiag++
    } else if (cellId === '3') {
      store.sumOfRow2++
      store.sumOfCol1++
    } else if (cellId === '4') {
      store.sumOfRow2++
      store.sumOfCol2++
      store.sumOfDiag++
      store.sumOfAntiDiag++
    } else if (cellId === '5') {
      store.sumOfRow2++
      store.sumOfCol3++
    } else if (cellId === '6') {
      store.sumOfRow3++
      store.sumOfCol1++
      store.sumOfAntiDiag++
    } else if (cellId === '7') {
      store.sumOfRow3++
      store.sumOfCol2++
    } else if (cellId === '8') {
      store.sumOfRow3++
      store.sumOfCol3++
      store.sumOfDiag++
    }
  } else if (xOrO === 'o') {
    if (cellId === '0') {
      store.sumOfRow1--
      store.sumOfCol1--
      store.sumOfDiag--
    // cell[1]
    } else if (cellId === '1') {
      store.sumOfRow1--
      store.sumOfCol2--
      // cell[2]
    } else if (cellId === '2') {
      store.sumOfRow1--
      store.sumOfCol3--
      store.sumOfAntiDiag--
    } else if (cellId === '3') {
      store.sumOfRow2--
      store.sumOfCol1--
    } else if (cellId === '4') {
      store.sumOfRow2--
      store.sumOfCol2--
      store.sumOfDiag--
      store.sumOfAntiDiag--
    } else if (cellId === '5') {
      store.sumOfRow2--
      store.sumOfCol3--
    } else if (cellId === '6') {
      store.sumOfRow3--
      store.sumOfCol1--
      store.sumOfAntiDiag--
    } else if (cellId === '7') {
      store.sumOfRow3--
      store.sumOfCol2--
    } else if (cellId === '8') {
      store.sumOfRow3--
      store.sumOfCol3--
      store.sumOfDiag--
    }
  }

  if (store.sumOfRow1 === 3 || store.sumOfRow2 === 3 || store.sumOfRow3 === 3 || store.sumOfCol1 === 3 || store.sumOfCol2 === 3 || store.sumOfCol3 === 3 || store.sumOfDiag === 3 || store.sumOfAntiDiag === 3) {
    $('#Message').html('Player X is the Winner')
    store.game.over = true
  } else if (store.sumOfRow1 === -3 || store.sumOfRow2 === -3 || store.sumOfRow3 === -3 || store.sumOfCol1 === -3 || store.sumOfCol2 === -3 || store.sumOfCol3 === -3 || store.sumOfDiag === -3 || store.sumOfAntiDiag === -3) {
    $('#Message').text('Player O is the Winner')
    store.game.over = true
  }
}

module.exports = {
  determineValue,
  clickBox,
  alreadyHasAValue,
  movesSoFar,
  isWinner,
  isTied,
  countClicks
}
