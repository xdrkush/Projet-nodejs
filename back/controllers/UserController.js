exports.editUserProfil = (req, res) => {

    let sql = `UPDATE user values nom=?, prenom=?, email=?, logo=?  WHERE id = ${req.params.id}`;
    let values = [
      req.body.nom,
      req.body.prenom,
      req.body.email,
      req.file.filename
    ];
    db.query(sql, values, function (err, data, fields) {
      if (err) throw err;
      res.redirect('back')
    })
};