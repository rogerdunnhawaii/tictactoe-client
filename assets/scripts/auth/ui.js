const store = require('../store')

const onCreateUserSuccess = (response) => {
  $('#Message').html('Successfully signed up, now please Sign In')
  $('#sign-up-modal').fadeOut(500, function () {
    $('#sign-up-modal').modal('hide')
  })
}

const onCreateUserFailure = () => {
  $('#Message').html('Error on sign up')
  $('#sign-up-modal').fadeOut(500, function () {
    $('#sign-up-modal').modal('hide')
  })
}

const onSignInSuccess = (responseData) => {
  $('.bottom').show()
  $('#Message').html('Successfully Signed in')
  store.user = responseData.user
  $('#sign-in-modal').fadeOut(500, function () {
    $('#sign-in-modal').modal('hide')
  })
  $('#insideGrid').show()
  $('#sign-out').show()
}

const onSignInFailure = () => {
  $('#Message').html('Unable to sign in')
  $('#sign-in-modal').fadeOut(500, function () {
    $('#sign-in-modal').modal('hide')
  })
}

const onChangePasswordSuccess = (responseData) => {
  $('#Message').html('Successfully changed password')
}

const onChangePasswordFailure = () => {
  $('#Message').html('Unable to change password because wrong password')
  $('#change-password-modal').fadeOut(500, function () {
    $('#change-password-modal').modal('hide')
  })
}

const onSignOutSuccess = (responseData) => {
  $('#Message').html('Successfully signed out')
  store.user = null
  $('#insideGrid').hide()
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
