exports.adminPage = (req, res) => {
  const fakedb = require('../../public/data/db.json');
  const {
    Timestamp
  } = require("@sapphire/time-utilities");
  const dateDay = `${new Timestamp("DD MMM YYY à HH %h mm")}`;

  // console.log(dateDay.replace('January', 'Janvier'))
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

    // SQL récupération de tout les creations
    let sql2 = `SELECT * FROM creations`;

    db.query(sql2, (error, data2, fields) => {
      if (error) throw error;
      res.render('admin', {
        title: `${process.env.ETP} - Administration`,
        user: data,
        creationsItem: data2
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
    false,
    Number(req.body.selectRole)
  ];
  db.query(sql, values, function (err, data, fields) {
    if (err) throw err;
    res.redirect('back')
  })
}

exports.banUser = (req, res) => {
  let sqlGet = `SELECT * FROM user WHERE id = ${req.params.id}`;

  db.query(sqlGet, (error, dataGet, fields) => {
    if (error) throw error;

    let sql = `UPDATE user SET ban=? WHERE id = ${req.params.id} `;

    db.query(sql, true, function (err, data2, fields) {
      if (err) throw err;
      
      let sql = `SELECT * FROM sessions WHERE data LIKE '%"id":${req.params.id}%'`;

      db.query(sql, (error, sess, fields) => {
        if (error) throw error;
        for (var sid in sess) {

          let sql = `DELETE FROM sessions WHERE session_id = "${sess[sid].session_id}" `;

          db.query(sql, function (err, data2, fields) {
            if (err) throw err;
            
          })
        }
        res.redirect('back')
      })
    })
  })
}

exports.editUser = (req, res) => {

  let sqlGet = `SELECT * FROM user WHERE id = ${req.params.id}`;

  db.query(sqlGet, (error, dataGet, fields) => {
    if (error) throw error;

    let values = [
      req.body.nom,
      req.body.prenom,
      req.body.email
    ];

    let sql = `UPDATE user SET nom=?, prenom=?, email=? WHERE id = ${req.params.id} `;

    db.query(sql, values, function (err, data2, fields) {
      if (err) throw err;
      res.redirect('back')
    })
  })
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