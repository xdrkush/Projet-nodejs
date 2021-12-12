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
    }
};