const api = require('./api')
const ui = require('./ui')
// const decision = require('./decision')
const getFormFields = require('../../../lib/get-form-fields')
const store = require('../store')

const { ifMiddleCellIsOpen,
  ifMiddleTaken,
  ifTwoXsAndEmptyCell,
  ifOneDiagLineXXO,
  ifTwoXOnEdgeOneOInMiddle,
  isMiddleCellOpen,
  isTwoPlayerExistInRowHoriOrVerOrDiagnal,
  isElementsInLine2OfPlayerAndThirdIsEmpty,
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
  isAllCellsTaken,
  findEmptyCells,
  randomInt,
  putPlayerInCoord
} = require("./lib/aiLogic");

let arrs = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
]

const USER_PLAYER = 'X'
const COMPUTER_PLAYER = 'O'

const onCellClick = function (index, currentArrs) {

  // disable the click after a winner is found
  if (checkWinner(currentArrs)) {
    return
  }

  // showing the user's new move
  const [x, y] = convertNormalIndexToArrayIndex(index)

  // check click on taken cell
  if (!isCoordinateOpen(currentArrs, x, y)) { // coordinate taken
    alert("You can't click on taken cell")
    return
  }

  // user move
  currentArrs[x][y] = USER_PLAYER
  renderArrs(currentArrs)

  // check winner
  if (checkWinnerAndRenderMessage(currentArrs)) {
    return
  }

  // UI move
  // calcualte computer move and show its move
  let updatedArrsWithAIMove = calculateAIMove(currentArrs)
  renderArrs(updatedArrsWithAIMove);

  // check winner
  if (checkWinnerAndRenderMessage(currentArrs)) {
    return
  }

}

function checkWinnerAndRenderMessage(currentArrs) {
  let winner = checkWinner(currentArrs)
  if (winner) {
    console.log('winner is found' + winner);
    if (winner == 'O') {
      updateUserMessage("Computer Wins")
    } else if (winner == 'X') {
      updateUserMessage("You Win")
    }
  }

  // check tie
  // if all cells are filled and no winner
  if (isAllCellsTaken(currentArrs) && !winner) {
    updateUserMessage("You Tied")
  }

  return winner
}

function updateUserMessage(message) {
  document.getElementById("user-message").innerHTML = message
}

// let currentArrs = [
//   ['', 'O', 'X'],
//   ['X', '', 'O'],
//   ['X', 'X', '']
// ]




const calculateAIMove = function (currentArrs) {

  let emptyCellXY = isTwoPlayerExistInRowHoriOrVerOrDiagnal(currentArrs, 'O')
  if (emptyCellXY) {
    // 7. if two player 2 in a line and 1 empty space
    // put player 2 in the empty space
    currentArrs[emptyCellXY[0]][emptyCellXY[1]] = 'O'
  } else if (isMiddleCellOpen(currentArrs)) {
    // if middle if open, put O there
    currentArrs[1][1] = COMPUTER_PLAYER
    console.log('case 1 success');
  } else {
    let emptyCellXY = isTwoPlayerExistInRowHoriOrVerOrDiagnal(currentArrs, 'X')
    if (emptyCellXY) {
      // 2.if two Xs in horitiozntal, vertical, diagnoal, 1 empty, then put O in the empty one
      currentArrs[emptyCellXY[0]][emptyCellXY[1]] = COMPUTER_PLAYER
      console.log('case 2 success');

    } else if (isDiagnalAlternating(currentArrs)) {
      //  3.for cases where in a row (horizontal, vertial, diagal), and elements alternate, 
      // 	check each row and column nad diagallnaly
      // 		select a empty middle egde
      // (dignall)
      // (cross)
      if (!isAll4EdgesAreTaken(currentArrs)) { // if there is space in middle edge
        putPlayerInMiddleEdge(currentArrs, 'O')
        console.log('case 3.1 success');
      } else if (!isAll4CornerTaken(currentArrs)) {
        // assume there are space in the corner?
        putPlayerInCorner(currentArrs, 'O')
        console.log('case 3.2 success');
      }

    } else {
      let cornerNotPut = isTwoPlayer1InMiddleEdgeNearEachOtherAndPlayer2AtCenter(currentArrs, 'X', 'O')
      if (!isAll4CornerTaken(currentArrs)) {
        // 6.go to an empty corner, where it touching a X
        putPlayerInCorner(currentArrs, 'O', cornerNotPut)
        console.log('case 6 success');
      } else if (currentArrs[1][1] !== '') { // if middle cell is not empty or taken
        // 4.if X is in the middle
        // put O in one of the 4 corners
        if (!isAll4CornerTaken(currentArrs)) { // make sure there is available cell
          putPlayerInCorner(currentArrs, 'O')
          console.log('case 4 success');
        }
      } else if (isTwoPlayer1TogetherAndOnePlayer2InOneLineDiagnally(currentArrs, "X", "O")) {
        //5.dignally, if two X and O in one line
        // go to an empty corner
        if (!isAll4CornerTaken(currentArrs)) { // make sure there is available cell
          putPlayerInCorner(currentArrs, 'O')
          console.log('case 5 success');
        }
      } else {
        // 8. in all other cases, write O in empty cell
        // put O in random empty cell
        let emptyCellsCoords = findEmptyCells(currentArrs)
        let random = randomInt(0, emptyCellsCoords.length)
        let randomEmptyCoord = emptyCellsCoords[random]
        currentArrs = putPlayerInCoord(currentArrs, 'O', randomEmptyCoord[0], randomEmptyCoord[1])
        console.log('case 8 success');
      }
    }
  }

  return currentArrs;
}

const onClick = function () {
  // if you signed in
  // if (store.guest === false) {
  //   if (store.game.over === false) {
  //     const turns = decision.countClicks()
  //     const cellId = $(this).attr('data-cell-index')
  //     if (decision.alreadyHasAValue(store, cellId)) {
  //       $('#Message').html('choose a different cell')
  //     } else {
  //       if (store.game.cells.every(x => x === '')) {
  //         store.lastmove = 'x'
  //         $(this).text(store.lastmove)
  //       }
  //       $(this).text(store.lastmove)
  //       const xOrO = store.lastmove
  //       if (xOrO === 'o') {
  //         $('#Message').html(`It is Player X's Turn`)
  //
  //         store.countOfO += 1
  //       } else {
  //         $('#Message').html(`It is Player O's Turn`)
  //         store.countOfX += 1
  //       }
  //       decision.isTied(turns)
  //       decision.isWinner(cellId, xOrO)
  //       api.updateTurn(cellId, store.lastmove)
  //         .then(ui.onUpdateGameSuccess)
  //         .catch(ui.onUpdateGameFailure)
  //       decision.determineValue()
  //     }
  //   }
  // } else {
  // console.log('clicked');
  const index = $(this).attr('data-cell-index')
  // console.log(index);
  onCellClick(index, arrs)
}

const renderArrs = function (arrs) {
  let currentCellIndex = 0
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      $(`div[data-cell-index=${currentCellIndex}]`).text(arrs[i][j])
      currentCellIndex++
    }
  }
}

const onGameIndex = function (event) {
  event.preventDefault()
  api.gameIndex()
    .then(ui.onGameIndexSuccess)
    .catch(ui.onGameIndexFailure)
}

const onClose = function () {
  store.games = 'null'
}

const clearArray = function () {
  const arrs = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ]
  return arrs
}

const onStartPlayGameAgainstAI = () => {
  arrs = clearArray()
  $('#user-message').text('')
  $('.bottom-grid').show()
  $('#create-game').show()
  $('#game-index').show()
  $('#tictactoe-grid').show()
  // $('#Message').html('Successfully Playing as a Guest against AI')
  store.guest = true
  store.gameBoard = ['', '', '', '', '', '', '', '', '']
  $('.box').text('')
  store.sumOfRow1 = 0
  store.sumOfRow2 = 0
  store.sumOfRow3 = 0
  store.sumOfCol1 = 0
  store.sumOfCol2 = 0
  store.sumOfCol3 = 0
  store.sumOfDiag = 0
  store.sumOfAntiDiag = 0
  store.row1Complete = false
  store.row2Complete = false
  store.row3Complete = false
  store.col1Complete = false
  store.col2Complete = false
  store.col3Complete = false
  store.diagComplete = false
  store.antiDiagComplete = false
}

const onCreateGame = function (event) {
  event.preventDefault()
  store.game = {}
  store.lastmove = 'x'
  $('.box').text('')
  $('.box').on('click')

  // comment out?
  api.createGame()
    .then(ui.onCreateGameSuccess)
    .catch(ui.onCreateGameFailure)
}

const onViewGame = function () {
  console.log('in viewgame')
  $('.tictactoe-grid').show()
  // document.getElementsById('tictactoe-grid').show()
  // console.log('in viewgame after show')
  const id = $(this).attr('id')
  $('#Message').html('You are viewing Game ID#: ' + id)
  $('#tictactoe-grid').show()
  $('#insideGrid').show()
  api.viewGame(id)
    .then(ui.onViewGameSuccess)
    .catch(ui.onViewGameFailure)
}

const onShowGame = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.showGame(data)
    .then(ui.onShowGameSuccess)
    .catch(ui.onShowGameFailure)
}

const onUpdateGame = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.updateGame(data)
    .then(ui.onUpdateGameSuccess)
    .catch(ui.onUpdateGameFailure)
}



// const xOrO = store.lastmove
// if (xOrO === 'o') {
//   $('#Message').html(`It is Player X's Turn`)
//   store.countOfO += 1
// } else {
//   $('#Message').html(`It is Player O's Turn`)
//   store.countOfX += 1
// }
// decision.isWinner(cellId, xOrO)
// }



module.exports = {
  onGameIndex,
  onCreateGame,
  onShowGame,
  onUpdateGame,
  onClick,
  onViewGame,
  onClose,
  onStartPlayGameAgainstAI,
  renderArrs
}
