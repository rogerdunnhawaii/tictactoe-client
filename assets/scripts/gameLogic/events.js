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

const onCreateGame = function (event) {
  event.preventDefault()
  store.game = {}
  store.lastmove = 'x'
  $('.box').text('')
  api.createGame()
    .then(ui.onCreateGameSuccess)
    .catch(ui.onCreateGameFailure)
}

const onViewGame = function () {
  $('#insideGrid').show()
  const id = $(this).attr('id')
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
}

module.exports = {
  onGameIndex,
  onCreateGame,
  onShowGame,
  onUpdateGame,
  onClick,
  onViewGame,
  onClose
}
