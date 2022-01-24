exports.adminPage = (req, res) => {
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