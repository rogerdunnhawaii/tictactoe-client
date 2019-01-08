const api = require('./api.js')
const ui = require('./ui.js')
const getFormFields = require('../../../lib/get-form-fields.js')
const store = require('../store')

const onCreateUser = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  console.log(data)
  api.createUser(data)
  // when API call is successful
    .then(ui.onCreateUserSuccess)
  // when API call fails
    .catch(ui.onCreateUserFailure)
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

const onClickZero = function () {
  console.log('hi')
}

const onClickOne = () => {
  $('#one').text('X')
}

// console.log($('#three').text())
// console.log($('#four').text())
// console.log($('#five').text())
// // {
//   $(event.target).append('x')
// }

module.exports = {
  onCreateUser,
  onSignIn,
  onSignOut,
  onChangePassword,
  onClickOne,
  onClickZero
}
