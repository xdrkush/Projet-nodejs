/*
 * Controller: Auth
 * **************** */
const bcrypt = require('bcrypt'),
  bcrypt_nb = 10;

exports.login = (req, res) => {
  let sql = `SELECT * FROM users WHERE (email= ?)`

  db.query(sql, req.body.email, function (err, data) {
    if (err) throw err;
    bcrypt.compare(req.body.password, data[0].password, function (err, result) {
      if (result === true) {
        

        let sqlGetRole = `SELECT isAdmin, isArchive, isBan FROM role WHERE (id_user= ${data[0].id})`
        db.query(sqlGetRole, function (err, data2) {
          console.log("dat2",data2)
          req.session.user = {
            id: data[0].id,
            email: data[0].email,
            avatar: data[0].logo,
            nom: data[0].nom,
            prenom: data[0].prenom,
            isAdmin: data2[0].isAdmin,
            isArchive: data2[0].isArchive,
            isBan: data2[0].isBan
          };
          res.redirect('back')
        })
      } else return;
    });
  })
}

exports.register = (req, res) => {
  let sql = `SELECT * FROM users WHERE email=?`;

  db.query(sql, req.body.email, function (err, data, fields) {
    if (err) throw err;
    if (!data[0]) {
      bcrypt.genSalt(bcrypt_nb, function (err, salt) {
        bcrypt.hash(req.body.password, salt, function (err, hash) {

          let sql = `INSERT INTO users set nom=?, prenom=?, email=?, password=?, avatar=?`;

          let values = [
            req.body.nom,
            req.body.prenom,
            req.body.email,
            hash,
            req.file.filename,
          ];

          db.query(sql, values, function (err, data, fields) {
            if (err) throw err;

            let sqlGet = `SELECT * FROM users WHERE (email= ?)`
            db.query(sqlGet, req.body.email, function (err, data) {

              let sqlSetRole = `INSERT INTO role set id_user=?, isBan=?, isArchive=?, isAdmin=?`
              let valuesRole = [
                data[0].id,
                false,
                false,
                false
              ]
              db.query(sqlSetRole, valuesRole, function (err, data) {
                if (err) throw err;
              })

              let sqlGetRole = `SELECT isAdmin FROM role WHERE id_user= ${data[0].id}`
              db.query(sqlGetRole, function (err, data2) {
        
                req.session.user = {
                    isadmin: data2[0].isAdmin,
                    id: data[0].id,
                    email: data[0].email,
                    avatar: data[0].avatar_path,
                    nom: data[0].nom,
                    prenom: data[0].prenom
                  };
                res.redirect('back')
              })

            })
          })

        });
      });
    } else {
      let sqlCreation = `SELECT * FROM creations ORDER BY id DESC`;
      db.query(sqlCreation, (error, data, fields) => {

        if (error) throw error;
        res.render('home', {
          title: `${process.env.ETP} - Accueil`,
          creationsItem: data,
          creations: Number(data.length),
          error_compte: true
        })
      })
    }
  })
}

exports.forgot = (req, res) => {
  let sql = `SELECT * FROM user WHERE email=?`;

  db.query(sql, req.body.email, function (err, data, fields) {
    console.log('FORGOT ', data[0].id)

    if (err) throw err;
    if (data[0]) {
      bcrypt.genSalt(bcrypt_nb, function (err, salt) {
        bcrypt.hash("azd8ef7sqd", salt, function (err, hash) {

          let sql = `UPDATE user SET password=? WHERE id=${data[0].id}`;

          db.query(sql, hash, function (err, data, fields) {
            if (err) throw err;
            res.redirect('back')
          })

        });
      });
    } else return res.send('Une erreur')
  })
}

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('htr');
    console.log("Clear Cookie session :", req.sessionID);
    res.redirect('/');
  })
}


// async function test() {
//   const users = await db.query('select * from users')
//   console.log('users', users)
//   users.forEach( async el => {
//     const hash = await bcrypt.hash(el.password, 10)
//     console.log('hash', hash)
//     let sql = `UPDATE users SET password="${ hash }" WHERE id = ${el.id} `;
//     await db.query(sql)

//   });
// }

// test()