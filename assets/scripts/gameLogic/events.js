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

const onCreateGame = function (event) {
  event.preventDefault()
  store.game = null
  $('.box').text('')
  api.createGame()
    .then(ui.onCreateGameSuccess)
    .catch(ui.onCreateGameFailure)
}

const onViewGame = function (id) {
  event.preventDefault()
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

const onClick = function () {
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
    } else {
      $('#Message').html(`It is Player O's Turn`)
    }
    decision.isWinner(cellId, xOrO)
    decision.isTied(turns)
    api.updateTurn(cellId, store.lastmove)
      .then(ui.onUpdateGameSuccess)
      .catch(ui.onUpdateGameFailure)
    decision.determineValue()
    console.log('store game after', store.game)
  }
}

module.exports = {
  onGameIndex,
  onCreateGame,
  onShowGame,
  onUpdateGame,
  onClick,
  onViewGame
}
