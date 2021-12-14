/*
 * Middleware: Auth
 * **************** */
module.exports = {
  isAdmin: (req, res, next) => {

    if (process.env.ISADMIN == "false") {
      var isAdmin = false
    } else {
      var isAdmin = true
    }
    if (process.env.ISCONNECT == "false") {
      var isConnect = false
    } else {
      var isConnect = true
    }
    if (isAdmin && isConnect === true) {
      next()
    } else {
      res.redirect('/')
    }
  },
  articleID: (req, res, next) => {
    const fakedb = require('../../public/data/db.json');

    var nbr = Number(req.params.id)
    nbr -= 1

    if (fakedb.blog[nbr] === undefined) {
      res.redirect('/blog')
    } else {
      next()
    }
  },
  editArticleID:(req, res, next) => {
    const fakedb = require('../../public/data/db.json');

    var nbr = Number(req.params.id)
    nbr -= 1

    if (fakedb.blog[nbr] === undefined) {
      res.redirect('/admin')
    } else {
      next()
    }
  }

};