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

exports.blogID = (req, res) => {
  const fakedb = require('../../public/data/db.json');
  console.log('db',fakedb.blog[0]);
    console.log('params', req.params.id)
    res.render("article",{
      BlogId: req.params.id,
      blogitem: fakedb.blog[req.params.id]
    });
};