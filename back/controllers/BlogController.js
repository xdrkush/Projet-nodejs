const fakedb = require('../../public/data/db.json');
const fs = require("fs");

exports.blogPage = (req, res) => {
  

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

  let article = {}

  fakedb.blog.forEach(art => {
    if (art.id === Number(req.params.id)) {
      article = art
    }
  })

  var nbr = Number(article.id)
  nbr -= 1

  res.render("article", {
    title: "SiteLand - Article",
    session: sess,
    isAdmin: admin,
    BlogID: req.params.id,
    blogitem: fakedb.blog[nbr]
  });

};

exports.editArticle = (req, res) => {
  console.log("controller edit Article", req.params.id, req.body);
  
  let dbArticle = fakedb.blog
  let dbUser = fakedb.user
  let index = 0
  console.log('id id id ', req.params.id);

  var nbr = Number(req.params.id)
  nbr -= 1
  
  const articleEdited = {
    id: Number(req.params.id),
    img: fakedb.blog[nbr].img,
    link_title: (req.body.title === "") ? fakedb.blog[nbr].link_title : req.body.title,
    desc: (req.body.desc === "") ? fakedb.blog[nbr].desc : req.body.desc,
    article_txt: (req.body.article === "") ? fakedb.blog[nbr].article_txt : req.body.article,
    alt: fakedb.blog[nbr].alt,
  }

  dbArticle.forEach(art => {
    if (art.id === Number(req.params.id)) {
      console.log('indexof', dbArticle.indexOf(art))
      index = dbArticle.indexOf(art)
    }
  })

  dbArticle.splice(index, index -1, articleEdited)
  dbArticle.slice(dbArticle.splice(index + 1, 1))

  const artID = {
    id: idArt,
    img: fakedb.blog[idArt].img,
    link_title: fakedb.blog[idArt].link_title,
    desc: fakedb.blog[idArt].desc,
    article: fakedb.blog[idArt].article,
    alt: fakedb.blog[idArt].alt
  }

  let data = JSON.stringify({ blog: dbArticle, user: dbUser }, null, 2);
  fs.writeFile("./public/data/db.json", data, (err) => {
    if (err) console.log(err);
  });

  res.redirect('/blog')
};

exports.deleteArticle = (req, res) => {
  console.log("controller delete Article", req.params.id, req.body);

  let dbArticle = fakedb.blog
  let dbUser = fakedb.user
  let index = 0

  dbArticle.forEach(art => {
    if (art.id === Number(req.params.id)) {
      console.log('indexof', dbArticle.indexOf(art))
      index = dbArticle.indexOf(art)
    }
  })
  dbArticle.slice(dbArticle.splice(index, 1))

  let data = JSON.stringify({ blog: dbArticle, user: dbUser }, null, 2);
  fs.writeFile("./public/data/db.json", data, (err) => {
    if (err) console.log(err);
  });

  res.redirect('/blog')
};