exports.adminpage = (req, res) => {
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
  res.render('admin', {
    title: "SiteLand - Admin",
    session: sess,
    isAdmin: admin,
    user: fakedb.user
  })
}