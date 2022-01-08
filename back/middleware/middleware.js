/*
 * Middleware: Auth
 * **************** */
module.exports = {
  isAdmin: (req, res, next) => {
    if (req.session.user.role === 1) {
      next()
    } else {
      res.redirect('/')
    }
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
    const fakedb = require('../../public/data/db.json');

    var nbr = Number(process.env.SESSID)
    nbr -= 1

    if (fakedb.user[nbr] === undefined) {
      res.redirect('/admin')
    } else {
      next()
      const userLog = fakedb.user[nbr]
    }
  },


};