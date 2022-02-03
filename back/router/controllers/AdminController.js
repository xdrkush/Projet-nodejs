/*
 * Controller: Admin
 * **************** */
exports.admin = async (req, res) => {
  
  // SQL récupération de tout les users
  const users = await db.query(`SELECT * FROM users`);
  // SQL récupération de tout les creations avec une image
  const creations = await db.query(`SET sql_mode=""; SELECT creations.id, creations.description, creations.date, creations.isDelete, images.img_url FROM creations INNER JOIN images ON images.id_creations = creations.id GROUP BY creations.id ORDER BY ID DESC`);

  res.render('admin', {
    title: `${process.env.ETP} - Administration`,
    user: users,
    creationsItem: creations[1],
    layout: 'admin'
  })
}
exports.banUser = async (req, res) => {

  // Update de l'user en mettant ban sur true
  await db.query(`UPDATE role SET isBan=true WHERE id_user = ${req.params.id}`), (err) => {
    if (err) throw err;
  }

  // Récuprécation de toute les sessions de l'user
  await db.query(`SELECT * FROM sessions WHERE data LIKE '%"id":${req.params.id}%'`), async (err, sess) => {
    if (err) throw err;
    
    for (var sid in sess) {
      // Destruction des sessions de l'utilisateur
      await db.query(`DELETE FROM sessions WHERE session_id = "${sess[sid].session_id}"`), (err) => {
        if (err) throw err;
      }
    }    
  }
  res.redirect('back')
}

exports.editUser = (req, res) => {

  let sqlGet = `SELECT * FROM users WHERE id = ${req.params.id}`;
  db.query(sqlGet, (error, dataGet, fields) => {
    if (error) throw error;

    let values = [
      req.body.nom,
      req.body.prenom,
      req.body.email
    ];

    let sql = `UPDATE users SET nom=?, prenom=?, email=? WHERE id = ${req.params.id} `;
    db.query(sql, values, function (err, data2, fields) {
      if (err) throw err;
      res.redirect('back')
    })
  })
}

exports.delComByAdmin = async (req, res) => {
  //  console.log(req);
  console.log("controller delete Com", req.params.id, req.body);
  const del = await db.query(`DELETE FROM commentaires WHERE id = ${req.params.id};`);

  res.redirect('back')

}