exports.blogPage = (req, res) => {
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

  res.render('blog', {
    title: "SiteLand - Blog",
    session: sess,
    isAdmin: admin,
    blogitem: fakedb.blog
  })
}

exports.blogID = (req, res) => {
  const fakedb = require('../../public/data/db.json').blog;
  
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

  res.render("article", {
    title: "SiteLand - Article",
    session: sess,
    isAdmin: admin,
    BlogID: req.params.id,
    blogitem: fakedb[req.params.id]
  });

  const
    ObjPush = {
            name: 'Vincent Lapierre',
            date: '26 Aout 2019',
            title: 'Le media pour tous'
        },
        fs = require('fs');

let data = JSON.stringify([ObjPush], null, req.params.id);

fs.writeFileSync(`../../public/data/db.json`, data);

};

exports.editArticle = (req, res) => {
  console.log("controller edit Article", req.params.id, req.body);
  res.redirect('/blog')
};

exports.deleteArticle = (req, res) => {
  console.log("controller delete Article", req.params.id, req.body);
  res.redirect('/blog')
};