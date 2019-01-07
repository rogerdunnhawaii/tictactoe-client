const store = require('../scripts/store')

const onCreateUserSuccess = (response) => {
  alert('Successfully signed up')
  console.log(response)
}

const onCreateUserFailure = () => {
  alert('Error on sign up')
}

const onSignInSuccess = (responseData) => {
  console.log('responseData is:', responseData)
  store.user = responseData.user
  console.log('Store is:', store)
  $('#sign-in-modal').fadeOut(500, function () {
    $('#sign-in-modal').modal('hide');
  })
}

const onSignInFailure = () => {
    alert('Unable to sign in')
}

const onChangePasswordSuccess = (responseData) => {
  alert('Successfully changed password')
  console.log('Store is: ', store)
}

const onChangePasswordFailure = () => {
  alert('Unable to change password because wrong password')
}

const onSignOutSuccess = (responseData) => {
  console.log('resonseData is:', responseData)
  alert('Successfully signed out')
  console.log('Store is:', store)
  store.user = null
  store.game = null
}

const onSignOutFailure = () => {
  alert('Unable to sign out')
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
