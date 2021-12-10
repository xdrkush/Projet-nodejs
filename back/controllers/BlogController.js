exports.blogpage = (req, res) => {
  const fakedb = require('../../public/data/db.json');

  if(process.env.ISADMIN == "false"){var admin = false}else{var admin = true}
  if(process.env.ISCONNECT == "false"){var sess = false}else{var sess = true}

  res.render('blog', {
    title: "SiteLand - Blog",
    session: sess,
    isAdmin: admin,
    blogitem: fakedb.blog
  })
}