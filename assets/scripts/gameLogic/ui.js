const store = require('../store')
const decision = require('./decision')

const onGameIndexSuccess = function (responseData) {
  console.log('responseData is:', responseData)
  $('#display').empty().append(responseData)
}

const onCreateGameSuccess = function (responseData) {
  $('#Message').text(`Successfully created game, It is Player X's Turn`)
  $('.tictactoe-grid').show()
  store.game = responseData.game
  store.countOfO = 0
  store.countOfX = 0
  store.sumOfRow1 = 0
  store.sumOfRow2 = 0
  store.sumOfRow3 = 0
  store.sumOfCol1 = 0
  store.sumOfCol2 = 0
  store.sumOfCol3 = 0
  store.sumOfDiag = 0
  store.sumOfAntiDiag = 0
  store.symbol = 'x'
  store.lastmove = null
  store.turn = null
  console.log('store after create game is: ', store)
}

const onCreateGameFailure = function () {
  alert('Unable to create game')
}

const onShowGameSuccess = function (responseData) {
  store.game = responseData.game
  console.log('Stored game is:', store.game)
  console.log('Stored cell is:', store.game.cells)
  for (let i = 0; i < store.game.cells.length; i++) {
    $(`div[data-cell-index=${i}]`).text(store.game.cells[i])
  }
  const turns = decision.movesSoFar(store)
  $('#display').html('# of turns: ', turns)
  store.turns = turns
}

const onUpdateGameSuccess = function (responseData) {
  store.game = responseData.game
  console.log(store.game)
  console.log('store game after update', store.game)
}

const onUpdateGameFailure = function () {
  alert('Unable to update game')
}

module.exports = {
  onGameIndexSuccess,
  onCreateGameSuccess,
  onShowGameSuccess,
  onUpdateGameSuccess,
  onUpdateGameFailure,
  onCreateGameFailure
}
