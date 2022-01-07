exports.editUserProfil = (req, res) => {

  let sqlGet = `SELECT * FROM user WHERE id = ${process.env.SESSID}`;

  db.query(sqlGet, (error, data, fields) => {
    if (error) throw error;
    let sql = `INSERT INTO user values nom=?, prenom=?, email=?, password=?, logo=?, ban=?, role=?`;
    let values = [
      (req.body.nom === "") ? data.nom : req.body.nom,
      (req.body.prenom === "") ? data.prenom : req.body.prenom,
      (req.body.email === "") ? data.email : req.body.email,
      data.password,
      data.logo,
      false,
      false
    ];
    db.query(sql, values, function (err, data, fields) {

      if (err) throw err;
      // SQL récupération de tout les users
      let sql = `SELECT * FROM user`;

      db.query(sql, (error, dataRes, fields) => {
        if (error) throw error;
        res.redirect('back')
      })
    })
  })
  console.log("controller edit user profil", req.params.id, req.body);

};
