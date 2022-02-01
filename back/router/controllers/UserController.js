/*
 * Controller: User
 * **************** */
const { cp } = require("fs");
const webhook = require("webhook-discord");

exports.editProfile = (req, res) => {

  let sql = `UPDATE user values nom=?, prenom=?, email=?, logo=?  WHERE id = ${req.params.id}`;
  let values = [
    req.body.nom,
    req.body.prenom,
    req.body.email,
    req.file.filename
  ];
  db.query(sql, values, function (err, data, fields) {
    if (err) throw err;
    res.redirect('back')
  })
};

exports.getProfile = (req, res) => {

  res.send('this')
};

exports.sendCom = async (req, res) => {
  console.log(req.session.user.id)
  const { com } = req.body;
  const { id } = req.params
  var content = com.replace("'", "\\'")

  const user = await db.query(`
    INSERT INTO commentaires set id_user=${req.session.user.id}, content='${content}', id_com_parent=null, id_articles = ${ id };
  `);
  
  console.log("ADD COM", req.body.com)
  res.redirect('back')
}

exports.replyCom = async (req, res) => {
  console.log(req.session.user.id)
  const { com } = req.body;
  var ref_com = req.params.id ? req.params.id : null
  var content = com.replace("'", "\\'")

  const user = await db.query(`
    INSERT INTO commentaires set id_user=${req.session.user.id}, content='${content}', id_com_parent=${ref_com}, id_articles = null
  `);
  
  console.log("ADD REPLY", req.body.com)
  res.redirect('back')
}
exports.deleteCom = async (req, res) => {
  //  console.log(req);
  console.log("controller delete Com", req.params.id, req.body);
  const del = await db.query(`DELETE FROM commentaires WHERE id = ${req.params.id};`);

 res.redirect('back')
 
}
exports.likeCom = async (req, res) => {
  const checkLike = await db.query(`SELECT * FROM com_list_likes WHERE id_com=${req.params.id} AND id_user=${req.session.user.id}`);

  if(!checkLike[0]){
    const setLike = await db.query(`INSERT INTO com_list_likes SET id_com=${req.params.id}, id_user=${req.session.user.id}, liked=1`);
  }
  else if(checkLike[0].liked == 0){
    const updateLike = await db.query(`UPDATE com_list_likes SET liked=1 WHERE id_com=${req.params.id} AND id_user=${req.session.user.id}`);
  }
  else if(checkLike[0].liked == 1){
    const updateLike = await db.query(`UPDATE com_list_likes SET liked=0 WHERE id_com=${req.params.id} AND id_user=${req.session.user.id}`);
  }
    
}
exports.reportCom = async (req, res) => {
  const Getcomment = await db.query(`SELECT content, id_user, id_articles FROM commentaires WHERE id = ${req.params.id}`);
  const Getuser = await db.query(`SELECT nom, prenom FROM users WHERE id = ${Getcomment[0].id_user}`);
  const Hook = new webhook.Webhook(process.env.WB);
  const msg = new webhook.MessageBuilder()
    .setName("Mail")
    .setColor("#ff3b3b")
    .setDescription(`Report de **${req.session.user.prenom} ${req.session.user.nom}**`)
    .addField(`Utilisateur:`, Getuser[0].nom+' '+Getuser[0].prenom)
    .addField(`Commentaire:`, Getcomment[0].content)
    .addField(`Page du commentaire:`, ` test [Ici](http://localhost:${process.env.PORT}/creations/${Getcomment[0].id_articles})`)
  Hook.send(msg);

}