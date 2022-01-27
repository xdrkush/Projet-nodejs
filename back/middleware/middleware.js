/*
 * Middleware: Auth
 * **************** */
module.exports = {
  isAdmin: (req, res, next) => {
    if (!req.session.user) {
      res.redirect('/')
    } else {
      console.log('sess',req.session.user)
      if (req.session.user.isAdmin === 1) {
        next()
      } else {
        res.redirect('/')
      }
    }
  },
  isBan: (req, res, next) => {
    let sql = `SELECT id FROM users WHERE (email= ?)`
    db.query(sql, req.body.email, function (err, data) {
      console.log('ml', data[0].id)
      let sqlGetBan = `SELECT isBan FROM role WHERE (id_user=${data[0].id})`
      db.query(sqlGetBan, (err, dataBan) => {
        if (err) throw err;
        if (dataBan === 1) {
          let sqlCreation = `SELECT * FROM creations ORDER BY id DESC`;
          db.query(sqlCreation, (error, data, fields) => {

            if (error) throw error;
            res.render('home', {
              title: `${process.env.ETP} - Accueil`,
              creationsItem: data,
              creations: Number(data.length),
              error_ban: true
            })
          })
        } else if (!dataBan) {
          next()
        } else {
          next()
        }

      })
    })
  },
  isArchive: (req, res, next) => {
    let sql = `SELECT id FROM users WHERE (email= ?)`
    db.query(sql, req.body.email, function (err, data) {

      let sqlGetBan = `SELECT isArchive FROM role WHERE id_user=${data[0].id}`
      db.query(sqlGetBan, (err, dataArchive) => {
        if (err) throw err;
        if (dataArchive === 1) {
          res.redirect('/')
        } else {
          next()
        }

      })
    })
  },
  articleID: (req, res, next) => {
    const fakedb = require('../../public/data/db.json');

    var nbr = Number(req.params.id)
    nbr -= 1

    if (fakedb.creations[nbr] === undefined) {
      res.redirect('/creations')
    } else {
      next()
    }
  },
  editArticleID: (req, res, next) => {
    const fakedb = require('../../public/data/db.json');

    var nbr = Number(req.params.id)
    nbr -= 1

    if (fakedb.creations[nbr] === undefined) {
      res.redirect('/admin')
    } else {
      next()
    }
  },
  SessionsActive: (req, res, next) => {
    if (!req.session.user) {
      res.redirect('/')
    } else {
      next()
    }
  },


};