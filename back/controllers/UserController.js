const fakedb = require('../../public/data/db.json');
const fs = require("fs");

exports.editUserProfil = (req, res) => {



  let dbArticle = fakedb.creations
  let dbUser = fakedb.user
  let index = 0

  console.log("TEST AGE", typeof (fakedb.user[req.params.id].age));
  console.log("controller edit user profil", req.params.id, req.body);

  const userEdited = {
    id: Number(req.params.id),
    prenom: (req.body.prenom === "") ? fakedb.user[req.params.id].prenom : req.body.prenom,
    nom: (req.body.nom === "") ? fakedb.user[req.params.id].nom : req.body.nom,
    age: fakedb.user[req.params.id].age,
    email: (req.body.email === "") ? fakedb.user[req.params.id].email : req.body.email,
    password: fakedb.user[req.params.id].password,
    fb_log: fakedb.user[req.params.id].fb_log,
    logo: (req.body.avatar === "") ? fakedb.user[req.params.id].logo : req.body.avatar,
    com_attente: fakedb.user[req.params.id].com_attente,
    com_check: fakedb.user[req.params.id].com_check,
    avis: fakedb.user[req.params.id].avis,
    message_to_admin: fakedb.user[req.params.id].message_to_admin,
    ban: fakedb.user[req.params.id].ban,
    role: fakedb.user[req.params.id].role,
  }

  dbUser.forEach(art => {
    if (art.id === Number(req.params.id)) {
      index = dbUser.indexOf(art)
    }
  })

  dbUser.splice(index, index - 1, userEdited)
  dbUser.slice(dbUser.splice(index + 1, 1))

  let data = JSON.stringify({ creations: dbArticle, user: dbUser }, null, 2);
  fs.writeFile("./public/data/db.json", data, (err) => {
    if (err) console.log(err);
  });
  res.redirect('back')

};
