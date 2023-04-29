const username = ''
const signingUser = ''
const token = ''

function changeUsername(username) {
  this.username = username
}

function changeSigningUser(signingUser) {
  this.signingUser = signingUser
}

function changeToken(token) {
  this.token = token
}

export default {
  username,
  signingUser,
  token,
  changeSigningUser,
  changeUsername,
  changeToken
}
