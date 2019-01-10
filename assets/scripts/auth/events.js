const api = require('./api.js')
const ui = require('./ui.js')
const getFormFields = require('../../../lib/get-form-fields.js')

const onCreateUser = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.createUser(data)
  // when API call is successful
    .then(ui.onCreateUserSuccess)
  // when API call fails
    .catch(ui.onCreateUserFailure)
}

const onClose = function () {
  $('form').trigger('reset')
}

const onSignIn = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signIn(data)
  // when API call is successful
    .then(ui.onSignInSuccess)
  // when API call fails
    .catch(ui.onSignInFailure)
}

const onChangePassword = function (event) {
  event.preventDefault()
  const formData = getFormFields(event.target)
  api.changePassword(formData)
    .then(ui.onChangePasswordSuccess)
    .catch(ui.onChangePasswordFailure)
  $('form').trigger('reset')
}

const onSignOut = function (event) {
  event.preventDefault()
  api.signOut()
    .then(ui.onSignOutSuccess)
    .catch(ui.onSignOutFailure)
  $('form').trigger('reset')
}

module.exports = {
  onCreateUser,
  onSignIn,
  onSignOut,
  onChangePassword,
  onClose
}
