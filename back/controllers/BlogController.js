exports.blogpage = (req, res) => {
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
  const fakedb = require('../../public/data/db.json');
  res.render("article", {
    title: "SiteLand - Article",
    BlogId: req.params.id,
    blogitem: fakedb.blog[req.params.id]
  });
};

exports.editArticle = (req, res) => {
  console.log("controller edit Article", req.params.id, req.body);
  res.render("editItem", {
    title: "SiteLand - Editions",
    ArticleID: req.params.id,
  });
};

exports.deleteArticle = (req, res) => {
  console.log("controller delete Article", req.params.id, req.body);
  res.render("deleteitem", {
    title: "SiteLand - Delete",
    ArticleID: req.params.id,
  });
};
