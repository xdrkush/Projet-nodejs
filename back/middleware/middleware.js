/*
 * Middleware: Auth
 * **************** */
module.exports = {
  isAdmin: (req, res, next) => {
    !req.session.user ? res.redirect('/') : (req.session.user.isAdmin == 0) ? res.redirect('/') : next();
  },
  isBan: (req, res, next) => {
    !req.session.user ? res.redirect('/') : (req.session.user.isBan == 1) ? res.redirect('/') : next();
  },
  isArchive: (req, res, next) => {
    (req.session.user.isArchive == 1) ? res.redirect('/') : next();
  },
  sessionsActive: (req,res, next) => {
    !req.session.user ? res.redirect('/') : next()
  }

};