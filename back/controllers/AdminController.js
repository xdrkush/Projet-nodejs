exports.adminPage = (req, res) => {
  const fakedb = require('../../public/data/db.json');
  console.log(req.path)
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

  var nbr = Number(process.env.SESSID)
  nbr -= 1

  // SQL récupération de tout les users
  let sql = `SELECT * FROM user`;

  db.query(sql, (error, data, fields) => {
    if (error) throw error;

    // SQL récupération de tout les users
    let sql2 = `SELECT * FROM creations`;

    db.query(sql2, (error, data2, fields) => {
      if (error) throw error;
      res.render('admin', {
        title: `${process.env.ETP} - Administration`,
        session: sess,
        isAdmin: admin,
        user: data,
        creationsItem: data2,
        userLog: fakedb.user[nbr]
      })
    })
  })
}
exports.createUser = async (req, res) => {

  // SQL pour creer un users
  let sql = `INSERT INTO user set nom=?, prenom=?, email=?, password=?, logo=?, ban=?, role=?`;
  let values = [
      req.body.nom,
      req.body.prenom,
      req.body.email,
      req.body.password,
      req.file.filename,
      true,
      req.body.selectRole
  ];
  db.query(sql, values, function (err, data, fields) {
      if (err) throw err;
      res.redirect('back')
  })
}

exports.banUser = (req, res) => {
  console.log("controller ban User", req.params.id);
  if (process.env.ISADMIN == "true" && process.env.ISCONNECT == "true") {
    res.redirect('/admin')
  } else {
    res.redirect('/')
  }
}

exports.editUser = (req, res) => {
  console.log("controller edit User", req.params.id, req.body);
  if (process.env.ISADMIN == "true" && process.env.ISCONNECT == "true") {
    res.redirect('/admin')
  } else {
    res.redirect('/')
  }
}

exports.deleteCom = (req, res) => {
  //  console.log(req);
  console.log("controller delete Com", req.params.id, req.body);
  if (process.env.ISADMIN == "true" && process.env.ISCONNECT == "true") {
    res.redirect('/admin')
  } else {
    res.redirect('/')
  }
}