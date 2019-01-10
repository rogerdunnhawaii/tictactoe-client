const store = require('../store')
const decision = require('./decision')

const onGameIndexSuccess = function (responseData) {
  $('#game-table-body').html('')
  responseData.games.forEach(games => {
    const gamesHTML = (`
      <tr>
        <td><button type="button" id='${games.id}' class="view-game btn-line clickable">View</button>
        <td> ${games.id}</td>
        <td> ${games.cells}</td>
        <td> ${games.over}</td>
        <td> ${games.player_x.email}</td>
      </tr>
     `)
    $('#game-table-body').append(gamesHTML)
  })
}

const onCreateGameSuccess = function (responseData) {
  $('#Message').text(`Successfully created game, It is Player X's Turn`)
  $('.bottom-grid').show()
  $('#insideGrid').show()
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
}

const onCreateGameFailure = function () {
  $('#Message').html('Unable to create game')
}

const onViewGameSuccess = function (responseData) {
  store.game = responseData.game
  console.log('store game in onViewGameSuccess', store.game)
  $('#insideGrid').show()
  $('.tictactoe-grid').show()
  for (let i = 0; i < store.game.cells.length; i++) {
    $(`div[data-cell-index=${i}]`).text(store.game.cells[i])
  }
  $('#modalGameList').fadeOut(500, function () {
    $('#modalGameList').modal('hide')
  })
}

const onViewGameFailure = function () {
  $('#Message').html('failure')
}

const onShowGameSuccess = function (responseData) {
  store.game = responseData.game
  for (let i = 0; i < store.game.cells.length; i++) {
    $(`div[data-cell-index=${i}]`).text(store.game.cells[i])
  }
  const turns = decision.movesSoFar(store)
  store.turns = turns
  $('#sign-up-modal').fadeOut(500, function () {
    $('#sign-up-modal').modal('hide')
  })
}

const onUpdateGameSuccess = function (responseData) {
  store.game = responseData.game
}

const onUpdateGameFailure = function () {
  $('#Message').html('Unable to update game')
}

module.exports = {
  onGameIndexSuccess,
  onCreateGameSuccess,
  onShowGameSuccess,
  onUpdateGameSuccess,
  onUpdateGameFailure,
  onCreateGameFailure,
  onViewGameSuccess,
  onViewGameFailure
}
