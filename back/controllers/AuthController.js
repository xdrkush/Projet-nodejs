exports.authLogin = (req, res) => {
  console.log("controller auth Login", req.body);
  var link = req.headers.referer
  res.redirect(`/${link.slice(22)}`)
}

exports.authRegister = (req, res) => {
    let sql = `INSERT INTO user set nom=?, prenom=?, email=?, password=?, logo=?, ban=?, role=?`;
console.log(req.file.filename)
    let values = [
        req.body.nom,
        req.body.prenom,
        req.body.email,
        req.body.password,
        req.file.filename,
        false,
        0
    ];
    db.query(sql, values, function (err, data, fields) {
        if (err) throw err;
        res.redirect('back')
    })
  }

exports.authForgot = (req, res) => {
  console.log("controller auth Forgot", req.body);
  res.redirect('/')
}

exports.authLogout = (req, res) => {
  console.log("controller auth Logout", req.body);
  res.redirect('/')
}