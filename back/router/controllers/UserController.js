/*
 * Controller: User
 * **************** */
exports.editProfile = (req, res) => {

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

exports.getProfile = (req, res) => {

  res.send('this')
};
exports.sendCom = async (req, res) => {
  console.log(req.session.user.id)
  const { com } = req.body;
  var ref_com = req.params.id ? req.params.id : null
  console.log(ref_com)
  const user = await db.query(`INSERT INTO commentaires set id_user=${req.session.user.id}, content='${com}', id_com_parent=${ref_com};`);
  console.log("ADD COM", req.body.com)
  res.redirect('back')
}