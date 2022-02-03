/*
 * Controller: Admin
 * **************** */
exports.admin = async (req, res) => {
    // SQL récupération de tout les users
    const users = await db.query(`SELECT * FROM users`);
    // SQL récupération de tout les creations
    const creations = await db.query(`SET sql_mode=""; SELECT creations.id, creations.description, creations.date, creations.isDelete, images.img_url FROM creations INNER JOIN images ON images.id_creations = creations.id GROUP BY creations.id ORDER BY ID DESC`);
    // console.log("user",users)      
//     console.log("crea",creations)  
    res.render('admin', {
        title: `${process.env.ETP} - Administration`,
        user: users,
        creationsItem: creations[1],
        layout: 'admin'
      })
}
exports.banUser = (req, res) => {
  // Select de l'user avec id
  let sqlGet = `SELECT * FROM users WHERE id = ${req.params.id}`;

  db.query(sqlGet, (error, dataGet, fields) => {
    if (error) throw error;

    // Update de l'user en mettant ban sur true 
    let sql = `UPDATE users SET ban=? WHERE id = ${req.params.id} `;
    db.query(sql, true, function (err, data2, fields) {
      if (err) throw err;
      
      // Récuprécation de toute les sessions de l'user
      let sql = `SELECT * FROM sessions WHERE data LIKE '%"id":${req.params.id}%'`;
      db.query(sql, (error, sess, fields) => {
        if (error) throw error;
        for (var sid in sess) {

          // Destruction des sessions de l'utilisateur
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