exports.authLogin = (req, res) => {
  console.log("controller auth Login", req.body);
  var link = req.headers.referer
  res.redirect(`/${link.slice(22)}`)
}

exports.authRegister = (req, res) => {
  console.log("controller auth Register", req.body);
  var link = req.headers.referer
  res.redirect(`/${link.slice(22)}`)
}

exports.authForgot = (req, res) => {
  console.log("controller auth Forgot", req.body);
  res.redirect('/')
}

exports.authLogout = (req, res) => {
  console.log("controller auth Logout", req.body);
  res.redirect('/')
}