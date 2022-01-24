/*
 * Middleware: Auth
 * **************** */
module.exports = {
  isAdmin: (req, res, next) => {
    if (!req.session.user) {
      res.redirect('/')
    } else {
      if (req.session.user.role === 1) {
        next()
      } else {
        res.redirect('/')
      }
    }
  },
  isBan: (req, res, next) => {
    let sql = `SELECT * FROM user WHERE (email= ?)`

    db.query(sql, req.body.email, function (err, data) {
      if (err) throw err;
      if (data[0].ban === 1) {
       let sql = `SELECT * FROM creations ORDER BY id DESC`;

       db.query(sql, (error, data, fields) => {
        
         if (error) throw error;
         res.render('home', {
          title: `${process.env.ETP} - Accueil`,
          creationsItem: data,
          creations: Number(data.length),
           error_ban: true
         })
       })
      } else {
        next()
      }
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