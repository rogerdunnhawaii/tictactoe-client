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
  isAllCellsTaken
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
    // todo: uncomment out after testing
    return
  }

  // showing the user's new move
  const [x, y] = convertNormalIndexToArrayIndex(index)

  if (!isCoordinateOpen(currentArrs, x, y)) { // coordinate taken
    alert("You can't click on taken cell")
    return
  }

  currentArrs[x][y] = USER_PLAYER
  renderArrs(currentArrs)

  // calcualte computer move and show its move
  let updatedArrsWithAIMove = calculateAIMove(currentArrs)
  renderArrs(updatedArrsWithAIMove);

  // after finished rendering both user and computer move
  let winner = checkWinner(currentArrs)
  if (winner) {
    console.log('winner is found');
    document.getElementById("user-message").innerHTML = `winner is ${winner}`
  }

  // check tie
  // if all cells are filled and no winner
  if (isAllCellsTaken(currentArrs) && !winner) {
    document.getElementById("user-message").innerHTML = "You tied"
  }



}

const calculateAIMove = function (currentArrs) {

  // currentArrs = [
  //   ['X', 'O', 'X'],
  //   ['X', 'O', 'O'],
  //   ['O', 'X', 'X']
  // ]


  let emptyCellXY = isTwoPlayerExistInRowHoriOrVerOrDiagnal(currentArrs, 'O')
  if (emptyCellXY) {
    currentArrs[emptyCellXY[0]][emptyCellXY[1]] = 'O'
  } else if (isMiddleCellOpen(currentArrs)) {
    currentArrs[1][1] = COMPUTER_PLAYER
    console.log('case 1 success');
  } else {
    let emptyCellXY = isTwoPlayerExistInRowHoriOrVerOrDiagnal(currentArrs, 'X')
    if (emptyCellXY) {
      currentArrs[emptyCellXY[0]][emptyCellXY[1]] = COMPUTER_PLAYER
      console.log('case 2 success');

    } else if (isDiagnalAlternating(currentArrs)) {
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
        putPlayerInCorner(currentArrs, 'O', cornerNotPut)
        console.log('case 6 success');
      } else if (currentArrs[1][1] !== '') { // if middle cell is not empty or taken
        if (!isAll4CornerTaken(currentArrs)) {
          putPlayerInCorner(currentArrs, 'O')
          console.log('case 4 success');
        }
      } else if (isTwoPlayer1TogetherAndOnePlayer2InOneLineDiagnally(currentArrs, "X", "O")) {
        if (!isAll4CornerTaken(currentArrs)) {
          putPlayerInCorner(currentArrs, 'O')
          console.log('case 5 success');
        }
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

  // // if you are a guest playing AI
  // console.log('store as guest', store)
  // const cellId = $(this).attr('data-cell-index')
  // console.log('cell id is', cellId)
  // store.cellId = cellId
  // console.log('store.cellId on Player X turn is', store.cellId)
  // // if (decision.alreadyHasAValue(cellId)) {
  // //   $('#Message').html('choose a different cell')
  // // } else {
  // // if (store.game.cells.every(x => x === '')) {
  // //   store.lastmove = 'x'
  // $(this).text(store.lastmove)
  // store.gameBoard[cellId] = store.lastmove
  // console.log('gameboard if cell is open', store.gameBoard)
  // decision.sumOfXandO(cellId, 'x')
  // console.log('store guest playing AI after sumOfXandO', store)
  // AIturn()
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
