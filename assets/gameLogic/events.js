const api = require('./api.js')
const ui = require('./ui.js')
const decision = require('./decision.js')
const getFormFields = require('../../lib/get-form-fields.js')
const store = require('../scripts/store')

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
  const cellId = $(this).attr('data-cell-index')
  if (decision.alreadyHasAValue(store, cellId)) {
    alert('choose a different cell')
  } else {
    const xOrO = decision.determineValue(store)
    $(this).text(xOrO)
    console.log('X or O:', xOrO)
    decision.clickBox(cellId, xOrO)
    console.log('value of store', store)
    const turns = decision.movesSoFar(store)
    console.log(turns)
    store.turns = turns
    decision.clickWinner(turns)
    api.updateTurn(cellId, xOrO)
      .then(ui.onUpdateGameSuccess)
      .catch(ui.onUpdateGameFailure)
  }
}



module.exports = {
  onGameIndex,
  onCreateGame,
  onShowGame,
  onUpdateGame,
  onClick
}
