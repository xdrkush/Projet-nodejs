const fakedb = require('../../public/data/db.json');
const dbArticles = require('../../public/data/db.json').creations;
const fs = require("fs");

exports.creationsPage = (req, res) => {


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

  res.render('creations', {
    title: `${process.env.ETP} - Création`,
    session: sess,
    isAdmin: admin,
    creationsItem: fakedb.creations,
    userLog: fakedb.user[nbr]
  })
}

exports.creationsID = (req, res) => {

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

  fakedb.creations.forEach(art => {
    if (art.id === Number(req.params.id)) {
      article = art
    }
  })

  var nbr = Number(article.id)
  nbr -= 1

  res.render("article", {
    title: `${process.env.ETP} - Articles`,
    session: sess,
    isAdmin: admin,
    creationsID: req.params.id,
    creationsItem: fakedb.creations[nbr]
  });

};

exports.editArticle = (req, res) => {
  console.log("controller edit Article", req.params.id, req.body);

  let dbArticle = fakedb.creations
  let dbUser = fakedb.user
  let index = 0
  var nbr = Number(req.params.id)
  nbr -= 1

  const articleEdited = {
    id: Number(req.params.id),
    img: (req.body.img === "") ? fakedb.creations[nbr].img : req.body.img,
    link_title: (req.body.title === "") ? fakedb.creations[nbr].link_title : req.body.title,
    desc: (req.body.desc === "") ? fakedb.creations[nbr].desc : req.body.desc,
    article_txt: (req.body.article === "") ? fakedb.creations[nbr].article_txt : req.body.article,
    alt: fakedb.creations[nbr].alt,
  }

  dbArticle.forEach(art => {
    if (art.id === Number(req.params.id)) {
      //console.log('indexof', dbArticle.indexOf(art))
      index = dbArticle.indexOf(art)
    }
  })

  dbArticle.splice(index, index - 1, articleEdited)
  dbArticle.slice(dbArticle.splice(index + 1, 1))

  let data = JSON.stringify({ creations: dbArticle, user: dbUser }, null, 2);
  fs.writeFile("./public/data/db.json", data, (err) => {
    if (err) console.log(err);
  });
  res.redirect('back')

};

exports.deleteArticle = (req, res) => {
  console.log("controller delete Article", req.params.id, req.body);

  let dbArticle = fakedb.creations
  let dbUser = fakedb.user
  let index = 0

  dbArticle.forEach(art => {
    if (art.id === Number(req.params.id)) {
      console.log('indexof', dbArticle.indexOf(art))
      index = dbArticle.indexOf(art)
    }
  })
  dbArticle.slice(dbArticle.splice(index, 1))

  let data = JSON.stringify({ creations: dbArticle, user: dbUser }, null, 2);
  fs.writeFile("./public/data/db.json", data, (err) => {
    if (err) console.log(err);
  });

  res.redirect('back')
};

exports.createArticle = (req, res) => {
 

  let dbArticle = fakedb.creations
  let dbUser = fakedb.user
  console.log("0",fakedb.creations)

  const art = {
    id:fakedb.creations.length += 1,
    img:req.body.avatar,
    desc:req.body.desc,
    date: "sd"
  };
  
  fakedb.creations.push(art)
  console.log("1",dbArticle)
  let data = JSON.stringify({ creations: dbArticle, user: dbUser }, null, 2);
  fs.writeFile("./public/data/db.json", data, (err) => {
    if (err) console.log(err);
  });
  console.log("controller create Article", 0, req.body);
  res.redirect('back')

};

exports.createArticleFun = (req, res) => {
  console.log("je suis le controller create Message", req.body);
  let dbUser = fakedb.user
  const art = {
    id:fakedb.creations.length += 1,
    img:req.body.avatar,
    desc:req.body.desc,
    date: "sd"
  };

  dbArticles.push(art);

  let data = JSON.stringify({ creations: dbArticles, user: dbUser }, null, 2);

  fs.writeFile("./public/data/db.json", data, (err) => {
    if (err) console.log(err);
    console.log("Fichier Json Créé");
  });

  res.redirect('back');
};