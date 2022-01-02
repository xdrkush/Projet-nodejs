/*
 * Controller: Home
 * **************** */

exports.homePage = (req, res) => {
  const fakedb = require('../../public/data/db.json');

  if (process.env.ISADMIN == "false") {
    var admin = false
  } else {
    var admin = true
  }
  if (process.env.ISCONNECT == "false") {
    var sess = false
  } else {
    var sess = true
  }

  var nbr = Number(process.env.SESSID)
  nbr -= 1

  res.render('home', {
    title: `${process.env.ETP} - Home`,
    session: sess,
    isAdmin: admin,
    creationsItem: fakedb.creations,
    userLog: fakedb.user[nbr]
  })
}