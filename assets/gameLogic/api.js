const config = require('../scripts/config')
const store = require('../scripts/store')

const gameIndex = function () {
  return $.ajax({
    url: config.apiUrl + '/games',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const createGame = function () {
  return $.ajax({
    url: config.apiUrl + '/games',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const showGame = function (data) {
  const id = data.game.id
  return $.ajax({
    url: config.apiUrl + '/games/' + id,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const updateGame = function (data) {
  console.log(data)
  return $.ajax({
    url: config.apiUrl + '/games/' + store.game.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      'game': {
        'cell': {
          'index': data.game.cell.index,
          'value': data.game.cell.value
        },
        'over': false
      }
    }
  })
}

const updateTurn = function (cellId, xOrO) {
  return $.ajax({
    url: config.apiUrl + '/games/' + store.game.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      'game': {
        'cell': {
          'index': cellId,
          'value': xOrO
        },
        'over': false
      }
    }
  })
}

// const onClick = function () {
//
// }
module.exports = {
  gameIndex,
  createGame,
  showGame,
  updateGame,
  updateTurn
//  onClick
}
