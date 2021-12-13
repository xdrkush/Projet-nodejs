exports.authLogin = (req, res) => {
    console.log("controller auth login", req.body);
    var link = req.headers.referer
    //${link.slice(22)}
    res.redirect(`/`)
}

exports.authRegister = (req, res) => {
    if (process.env.ISADMIN == "false") {
        var admin = false
      } else {
        var admin = true
      }
      if (process.env.ISCONNECT == "false") {
        var sess = false
      } else {
        var sess = true
      }
      
    console.log("controller auth register", req.body);
    var link = req.headers.referer
    res.render('register', {
        title: "SiteLand - Register",
        session: sess,
        isAdmin: admin
      })
}