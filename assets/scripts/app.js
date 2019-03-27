'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')
const authEvents = require('./auth/events.js')
const aiController = require('./gameLogic/aiController.js')
const userController = require('./gameLogic/userController.js')

const store = require('./store')

$(() => {
  store.guest = false
  $('#create-user').on('submit', authEvents.onCreateUser)
  $('#sign-in').on('submit', authEvents.onSignIn)
  $('#sign-out').on('click', authEvents.onSignOut)
  $('#change-password').on('submit', authEvents.onChangePassword)
  $('.close').click(authEvents.onClose)

  $('#game-index').on('click', userController.onGameIndex)
  $('#create-game').on('click', (event) => {
    $('.box').off("click")
    $('.box').click(userController.onClick)
    userController.onCreateGame(event)
  })
  $('#show-game').on('submit', userController.onShowGame)
  $('#update-game').on('submit', userController.onUpdateGame)

  $('.table').on('click', '.view-game', userController.onViewGame)
  $('.close').click(userController.onClose)

  // if guest (not signed in)
  // use aiController.onClick
  // else if // todo
  // use userController.onClick

  $('#guest-button').on('click', () => {

    $('#create-game').hide()
    $('#game-index').hide()
    $("#user-message").show()

    $('#user-message').text('')
    $('.bottom-grid').show()
    $('#tictactoe-grid').show()
    aiController.startGame()
    $('.box').off("click")
    $('.box').click(aiController.onClick)
  })
})
