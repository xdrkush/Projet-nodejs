/*
 * Middleware: Auth
 * **************** */ 
module.exports = {
    isAdmin: (req, res, next) => {
        if(process.env.ISADMIN === "false"){var isAdmin = false}else{var isAdmin = true}
        if (isAdmin === true) {
            next()
        } else {
            res.redirect('/')
        }
    }
};