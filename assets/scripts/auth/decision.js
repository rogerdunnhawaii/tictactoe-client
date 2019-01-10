const store = require('../scripts/store')

const alreadyHasAValue = function (store, cellId) {
  const gameBoard = store.game.cells
  if (gameBoard[cellId] === 'x' || gameBoard[cellId] === 'o') {
    $('#display').text('Choose a different cell')
    return true
  } else {
    return false
  }
}

const determineValue = function (store) {
  const cells = store.game.cells
  let countOfX = 0
  let countOfO = 0
  let xOrO
  for (let i = 0; i < cells.length; i++) {
    if (cells[i] === 'x') {
      countOfX++
    } else if (cells[i] === 'o') {
      countOfO++
    }
  }
  countOfX > countOfO ? xOrO = 'o' : xOrO = 'x'
  if (cells.every(x => x === '')) {
    xOrO = 'x'
  } else {
    if (store.lastmove === 'x') {
      xOrO = 'o'
    } else if (store.lastmove === 'o') {
      xOrO = 'x'
    }
  }
  return xOrO
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
  store.lastmove = xOrO
  store.game.cells[cellId] = xOrO
}

const clickWinner = function (turns) {
  let sumOfX = 0
  let sumOfO = 0
  const cells = store.game.cells
  for (let i = 0; i < cells.length; i++) {
    if (cells[i] === 'x') {
      sumOfX += i
    } else if (cells[i] === 'o') {
      sumOfO += i
    }
  }
  if (turns >= 5) {
    if ((sumOfX % 3 === 0 || sumOfO % 3 === 0) && sumOfO !== 6 && sumOfX !== 6) {
      $('#Message').html('There is a winner, please start a new game')
    } else if (sumOfX + sumOfO === 36) {
      $('#Message').html('Game is Tied')
    }
  }
}

module.exports = {
  determineValue,
  clickBox,
  alreadyHasAValue,
  movesSoFar,
  clickWinner
}
