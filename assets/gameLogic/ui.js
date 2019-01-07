const store = require('../scripts/store')
const decision = require('./decision')

const onGameIndexSuccess = function (responseData) {
  console.log('responseData is:', responseData)
}

const onCreateGameSuccess = function (responseData) {
 $('#display').text('Successfully created games')
  store.game = responseData.game
}

const onCreateGameFailure = function () {
  alert('Unable to create game')
}

const onShowGameSuccess = function (responseData) {
  store.game = responseData.game
  for (let i = 0; i < store.game.cells.length; i++) {
    $(`div[data-cell-index=${i}]`).text(store.game.cells[i])
  }
  console.log('Stored game is:', store.game)
  console.log('Stored cell is:', store.game.cells)
  const turns = decision.movesSoFar(store)
  $('#display').html('# of turns: ', turns)
}

const onUpdateGameSuccess = function (responseData) {
  store.game = responseData.game
  console.log(store.game)
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
