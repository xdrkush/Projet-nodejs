exports.contactpage = (req, res) => {
  if(process.env.ISADMIN == "false"){var admin = false}else{var admin = true}
  if(process.env.ISCONNECT == "false"){var sess = false}else{var sess = true}

    res.render('contact',{
        title: "SiteLand - Contact",
        session: sess,
        isAdmin: admin
      })
}