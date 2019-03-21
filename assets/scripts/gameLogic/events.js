const api = require('./api')
const ui = require('./ui')
const decision = require('./decision')
const getFormFields = require('../../../lib/get-form-fields')
const store = require('../store')

const onGameIndex = function (event) {
  event.preventDefault()
  api.gameIndex()
    .then(ui.onGameIndexSuccess)
    .catch(ui.onGameIndexFailure)
}

const onClose = function () {
  store.games = 'null'
}


const onGuestClick = () => {
  $('.bottom-grid').show()
  $('#create-game').show()
  $('#game-index').show()
  $('#tictactoe-grid').show()
  // $('#Message').html('Successfully Playing as a Guest against AI')
  store.guest = true
  // store.gameBoard = ['', '', '', '', '', '', '', '', '']
  // $('.box').text('')
  // store.sumOfRow1 = 0
  // store.sumOfRow2 = 0
  // store.sumOfRow3 = 0
  // store.sumOfCol1 = 0
  // store.sumOfCol2 = 0
  // store.sumOfCol3 = 0
  // store.sumOfDiag = 0
  // store.sumOfAntiDiag = 0
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

const convertNormalIndexToArrayIndex = function(normalIndex) {

  let i = Math.floor(normalIndex / 3);
  let j = normalIndex % 3;

  return [i,j];
}

const guestOnClick = function(index, arrs) {

  let [arrIndexI, arrIndexJ] = convertNormalIndexToArrayIndex(index);
  arrs[arrIndexI][arrIndexJ] = 'X';
  renderArrs(arrs);
}


const renderArrs = function(arrs) {

  let currentCellIndex = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      $(`div[data-cell-index=${currentCellIndex}]`).text(arrs[i][j]);
      currentCellIndex++;
    }
  }

}

const onClick = function () {
  // if you signed in
  if (store.guest === false) {
    if (store.game.over === false) {
      const turns = decision.countClicks()
      const cellId = $(this).attr('data-cell-index')
      if (decision.alreadyHasAValue(store, cellId)) {
        $('#Message').html('choose a different cell')
      } else {
        if (store.game.cells.every(x => x === '')) {
          store.lastmove = 'x'
          $(this).text(store.lastmove)
        }
        $(this).text(store.lastmove)
        const xOrO = store.lastmove
        if (xOrO === 'o') {
          $('#Message').html(`It is Player X's Turn`)

          store.countOfO += 1
        } else {
          $('#Message').html(`It is Player O's Turn`)
          store.countOfX += 1
        }
        decision.isTied(turns)
        decision.isWinner(cellId, xOrO)
        api.updateTurn(cellId, store.lastmove)
          .then(ui.onUpdateGameSuccess)
          .catch(ui.onUpdateGameFailure)
        decision.determineValue()
      }
    }
  } else {
    // console.log('clicked');

    let arrs = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ];

    let index = $(this).attr("data-cell-index");
    // console.log(index);
    guestOnClick(index, arrs);

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
  // const xOrO = store.lastmove
  // if (xOrO === 'o') {
  //   $('#Message').html(`It is Player X's Turn`)
  //   store.countOfO += 1
  // } else {
  //   $('#Message').html(`It is Player O's Turn`)
  //   store.countOfX += 1
  // }
  // decision.isWinner(cellId, xOrO)
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

const AIturn = function () {
  console.log('it is now AI turn')
  console.log('store on antiDiag', store.sumOfAntiDiag)
  // IF THERE IS TWO O IN SAME ROW, FILL THIRD CELL
  if (store.sumOfRow1 === 2 || store.sumOfRow2 === 2 || store.sumOfRow3 === 2 || store.sumOfCol1 === 2 || store.sumOfCol2 === 2 || store.sumOfCol3 === 2 || store.sumOfDiag === 2 || store.sumOfAntiDiag === 2) {
    if (store.sumOfRow1 === 2) {
      if (store.gameBoard[0] === '') {
        store.gameBoard[0] = 'o'
        $(`div[data-cell-index='0']`).text('o')
      } else if (store.gameBoard[1] === '') {
        store.gameBoard[1] = 'o'
        $(`div[data-cell-index='1']`).text('o')
      } else if (store.gameBoard[2] === '') {
        store.gameBoard[2] = 'o'
        $(`div[data-cell-index='2']`).text('o')
      }
    } else if (store.sumOfRow2 === 2) {
      if (store.gameBoard[3] === '') {
        store.gameBoard[3] = 'o'
        $(`div[data-cell-index='3']`).text('o')
      } else if (store.gameBoard[4] === '') {
        store.gameBoard[4] = 'o'
        $(`div[data-cell-index='4']`).text('o')
      } else if (store.gameBoard[5] === '') {
        store.gameBoard[5] = 'o'
        $(`div[data-cell-index='5']`).text('o')
      }
    } else if (store.sumOfRow3 === 2) {
      if (store.gameBoard[6] === '') {
        store.gameBoard[6] = 'o'
        $(`div[data-cell-index='6']`).text('o')
      } else if (store.gameBoard[7] === '') {
        store.gameBoard[7] = 'o'
        $(`div[data-cell-index='7']`).text('o')
      } else if (store.gameBoard[8] === '') {
        store.gameBoard[8] = 'o'
        $(`div[data-cell-index='8']`).text('o')
      }
    } else if (store.sumOfCol1 === 2) {
      if (store.gameBoard[0] === '') {
        store.gameBoard[0] = 'o'
        $(`div[data-cell-index='0']`).text('o')
      } else if (store.gameBoard[3] === '') {
        store.gameBoard[3] = 'o'
        $(`div[data-cell-index='3']`).text('o')
      } else if (store.gameBoard[6] === '') {
        store.gameBoard[6] = 'o'
        $(`div[data-cell-index='6']`).text('o')
      }
    } else if (store.sumOfCol2 === 2) {
      if (store.gameBoard[1] === '') {
        store.gameBoard[1] = 'o'
        $(`div[data-cell-index='1']`).text('o')
      } else if (store.gameBoard[4] === '') {
        store.gameBoard[4] = 'o'
        $(`div[data-cell-index='4']`).text('o')
      } else if (store.gameBoard[7] === '') {
        store.gameBoard[7] = 'o'
        $(`div[data-cell-index='7']`).text('o')
      }
    } else if (store.sumOfCol3 === 2) {
      if (store.gameBoard[2] === '') {
        store.gameBoard[2] = 'o'
        $(`div[data-cell-index='2']`).text('o')
      } else if (store.gameBoard[5] === '') {
        store.gameBoard[5] = 'o'
        $(`div[data-cell-index='5']`).text('o')
      } else if (store.gameBoard[8] === '') {
        store.gameBoard[8] = 'o'
        $(`div[data-cell-index='8']`).text('o')
      }
    } else if (store.sumOfDiag === 2) {
      if (store.gameBoard[0] === '') {
        store.gameBoard[0] = 'o'
        $(`div[data-cell-index='0']`).text('o')
      } else if (store.gameBoard[4] === '') {
        store.gameBoard[4] = 'o'
        $(`div[data-cell-index='4']`).text('o')
      } else if (store.gameBoard[8] === '') {
        store.gameBoard[8] = 'o'
        $(`div[data-cell-index='6']`).text('o')
      } else if (store.gameBoard[0] !== '' && store.gameBoard[4] !== '' && store.gameBoard[8] !== '') {
        const cornerArray = [2, 6]
        let randomCorner = cornerArray[Math.floor(Math.random() * cornerArray.length)]
        console.log('randomCorner', randomCorner)
        while (store.gameBoard[randomCorner] !== '') {
          randomCorner = generateRandomCornerNumber()
          return randomCorner
        }
        store.gameBoard[randomCorner] = 'o'
        $(`div[data-cell-index='${randomCorner}']`).text('o')
        store.cellId = randomCorner
      }
    } else if (store.sumOfAntiDiag === 2) {
      if (store.gameBoard[2] === '') {
        store.gameBoard[2] = 'o'
        $(`div[data-cell-index='2']`).text('o')
      } else if (store.gameBoard[4] === '') {
        store.gameBoard[4] = 'o'
        $(`div[data-cell-index='4']`).text('o')
      } else if (store.gameBoard[6] === '') {
        store.gameBoard[6] = 'o'
        $(`div[data-cell-index='6']`).text('o')
      }
    }
  } else {
    if (store.gameBoard[4] === '') {
      store.gameBoard[4] = 'o'
      $(`div[data-cell-index='4']`).text('o')
      store.cellId = 4

      // *IF THERE IS O IN THE MIDDLE CELL PUT O ONE OF THE CELLS 1,3,5,7
    } else if (store.gameBoard[4] === 'o') {
      let randomMiddleEdge = generateRandomMiddleNumber()
      console.log('randomMiddleEdge', randomMiddleEdge)
      while (store.gameBoard[randomMiddleEdge] !== '') {
        randomMiddleEdge = generateRandomMiddleNumber()
        return randomMiddleEdge
      }
      store.gameBoard[randomMiddleEdge] = 'o'
      $(`div[data-cell-index='${randomMiddleEdge}']`).text('o')
      store.cellId = randomMiddleEdge

    // IF MIDDLE CELL IS OCCUPIED PUT ON ANY OF VACANT CORNER CELLS
    } else if (store.gameBoard[4] === 'x') {
      let randomCorner = generateRandomCornerNumber()
      console.log('randomCorner', randomCorner)
      while (store.gameBoard[randomCorner] !== '') {
        randomCorner = generateRandomCornerNumber()
        return randomCorner
      }
      store.gameBoard[randomCorner] = 'o'
      $(`div[data-cell-index='${randomCorner}']`).text('o')
      store.cellId = randomCorner
    }
  }
  // tally up the number of Xs and Os in the different rows columns diagonals
  console.log('store.cellId on Player O turn is', store.cellId)
  decision.sumOfXandO('store.cellId', 'o')
  console.log('store after sumOfXandO', store)
}

module.exports = {
  onGameIndex,
  onCreateGame,
  onShowGame,
  onUpdateGame,
  onClick,
  onViewGame,
  onClose,
  onGuestClick,
  renderArrs
}
