exports.editUserProfil = (req, res) => {
    console.log("controller edit user profil", req.params.id, req.body);
  
    let dbArticle = fakedb.blog
    let dbUser = fakedb.user
    let index = 0
  
    var nbr = Number(req.params.id)
    nbr -= 1
  
    const userEdited = {
        id: Number(req.params.id),
        prenom: (req.body.prenom === "") ? fakedb.user[nbr].prenom : req.body.prenom,
        nom:(req.body.nom === "") ? fakedb.user[nbr].nom : req.body.nom,
        genre: fakedb.user[nbr].genre,
        age: fakedb.user[nbr].age,
        email: (req.body.email === "") ? fakedb.user[nbr].email : req.body.email,
        password: (req.body.password === "") ? fakedb.user[nbr].password : req.body.password,
        fb_log: fakedb.user[nbr].fb_log,
        logo: (req.body.logo === "") ? fakedb.user[nbr].logo : req.body.logo,
        com_attente: fakedb.user[nbr].com_attente,
        com_check: fakedb.user[nbr].com_check,
        avis: fakedb.user[nbr].avis,
        message_to_admin: fakedb.user[nbr].message_to_admin,
        ban: fakedb.user[nbr].ban,
        role: fakedb.user[nbr].role,
    }
  
    dbUser.forEach(art => {
      if (art.id === Number(req.params.id)) {
        index = dbUser.indexOf(art)
      }
    })
  
    dbUser.splice(index, index - 1, userEdited)
    dbUser.slice(dbUser.splice(index + 1, 1))
   
    let data = JSON.stringify({ blog: dbArticle, user: dbUser }, null, 2);
    fs.writeFile("./public/data/db.json", data, (err) => {
      if (err) console.log(err);
    });
   res.redirect('/')
   
  };
  