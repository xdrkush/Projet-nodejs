exports.adminPage = (req, res) => {
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
    title: `${process.env.ETP} - Administration`,
    session: sess,
    isAdmin: admin,
    user: fakedb.user,
    blogitem: fakedb.blog
  })
}

exports.banUser = (req, res) => {
  console.log("controller ban User", req.params.id);
  if (process.env.ISADMIN == "true" && process.env.ISCONNECT == "true") {
    res.redirect('/admin')
  } else {
    res.redirect('/')
  }
}

exports.editUser = (req, res) => {
  console.log("controller edit User", req.params.id, req.body);
  if (process.env.ISADMIN == "true" && process.env.ISCONNECT == "true") {
    res.redirect('/admin')
  } else {
    res.redirect('/')
  }
}

exports.deleteCom = (req, res) => {
  //  console.log(req);
  console.log("controller delete Com", req.params.id, req.body);
  if (process.env.ISADMIN == "true" && process.env.ISCONNECT == "true") {
    res.redirect('/admin')
  } else {
    res.redirect('/')
  }
}