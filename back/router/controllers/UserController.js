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
  const { id } = req.params
  var content = com.replace("'", "\\'")

  const user = await db.query(`
    INSERT INTO commentaires set id_user=${req.session.user.id}, content='${content}', id_com_parent=null, id_articles = ${ id };
  `);
  
  console.log("ADD COM", req.body.com)
  res.redirect('back')
}

exports.replyCom = async (req, res) => {
  console.log(req.session.user.id)
  const { com } = req.body;
  var ref_com = req.params.id ? req.params.id : null
  var content = com.replace("'", "\\'")

  const user = await db.query(`
    INSERT INTO commentaires set id_user=${req.session.user.id}, content='${content}', id_com_parent=${ref_com}, id_articles = null;
  `);
  
  console.log("ADD REPLY", req.body.com)
  res.redirect('back')
}
exports.deleteCom = async (req, res) => {
  //  console.log(req);
  console.log("controller delete Com", req.params.id, req.body);
  const del = await db.query(`DELETE FROM commentaires WHERE id = ${req.params.id};`);

 res.redirect('back')
 
}
exports.likeCom = async (req, res) => {
  console.log('like ', req.params.id)
  // res.redirect('back')
}