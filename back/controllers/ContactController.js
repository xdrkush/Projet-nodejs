exports.contactPage = (req, res) => {
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

  res.render('contact', {
    title: `${process.env.ETP} - Contact`,
    session: sess,
    isAdmin: admin
  })
}

exports.sendMessage = (req, res) => {
  console.log("controller send Message", req.body);
  res.redirect('/')
}