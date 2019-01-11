'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')
const events = require('./auth/events.js')
const gameEvents = require('./gameLogic/events.js')

$(() => {
  $('#create-user').on('submit', events.onCreateUser)
  $('#sign-in').on('submit', events.onSignIn)
  $('#sign-out').on('click', events.onSignOut)
  $('#change-password').on('submit', events.onChangePassword)
  $('.close').click(events.onClose)

  $('#game-index').on('click', gameEvents.onGameIndex)
  $('#create-game').on('click', gameEvents.onCreateGame)
  $('#show-game').on('submit', gameEvents.onShowGame)
  $('#update-game').on('submit', gameEvents.onUpdateGame)

  $('.table').on('click', '.view-game', gameEvents.onViewGame)
  $('.close').click(gameEvents.onClose)
  $('.box').click(gameEvents.onClick)

})
