const store = require('../store')

const onCreateUserSuccess = (response) => {
  $('#Message').html('Successfully signed up, now please Sign In')
  $('#sign-up-modal').fadeOut(500, function () {
    $('#sign-up-modal').modal('hide')
  })
  $('#create-user').trigger('reset')
}

const onCreateUserFailure = () => {
  $('#Message').html('Error on sign up')
  $('#sign-up-modal').fadeOut(500, function () {
    $('#sign-up-modal').modal('hide')
  })
  $('form').trigger('reset')
}

const onSignInSuccess = (responseData) => {
  // message to user
  $('#Message').html('Successfully Signed in')
  $('.bottom-buttons').css('display', 'flex')
  $('.bottom-grid').hide()
  $('#guest-button').hide()

  //  store user data
  store.user = responseData.user

  //  fade out sign-in box
  $('#sign-in-modal').fadeOut(500, function () {
    $('#sign-in-modal').modal('hide')
  })
  // buttons
  $('.sign-out-div').show()
  $('#sign-out').show()
  $('.change-password-button').show()
  $('.sign-in-button').hide()
  $('.sign-up-button').hide()

  // reset content in sign in form
  $('#sign-in').trigger('reset')
  $('.bottom-grid').show()
  $('#create-game').show()
  $('#game-index').show()
}

const onSignInFailure = () => {
  $('#Message').html('Unable to sign in')
  $('#sign-in-modal').fadeOut(500, function () {
    $('#sign-in-modal').modal('hide')
  })
  $('form').trigger('reset')
}

const onChangePasswordSuccess = (responseData) => {
  $('#Message').html('Successfully changed password')
}

const onChangePasswordFailure = () => {
  $('#Message').html('Unable to change password because wrong password')
  $('#change-password-modal').fadeOut(500, function () {
    $('#change-password-modal').modal('hide')
  })
  $('form').trigger('reset')
}

const onSignOutSuccess = (responseData) => {
  $('#Message').html('Successfully signed out')
  store.user = null
  store.game = null
  $('.change-password-button').hide()
  $('.sign-up-button').show()
  $('.sign-in-button').show()
  $('.sign-out-div').hide()
  $('#create-game').hide()
  $('#game-index').hide()
  $('#tictactoe-grid').hide()
//  $('.tictactoe-grid').hide()
}

const onSignOutFailure = () => {
  $('#Message').html('Unable to sign out')
}

module.exports = {
  onCreateUserSuccess,
  onCreateUserFailure,
  onSignInSuccess,
  onSignInFailure,
  onSignOutSuccess,
  onSignOutFailure,
  onChangePasswordSuccess,
  onChangePasswordFailure
}
