/*
 * Controller: Home
 * **************** */
const webhook = require("webhook-discord");

exports.home = (req, res) => {
  // SQL récupération de tout les creations
  let sql = `SELECT creations.id, creations.description, creations.date, creations.isDelete, images.img_url
                  FROM creations 
                  INNER JOIN images
                  ON images.id_creations = creations.id
                  group by creations.id
                  ORDER BY ID DESC`

  db.query(sql, (error, data, fields) => {
    if (error) throw error;
    res.render('home', {
      title: `${process.env.ETP} - Accueil`,
      creationsItem: data,
      creations: Number(data.length),
    })
  })
}

exports.form = (req, res) => {

  const Hook = new webhook.Webhook(process.env.WB);
  const msg = new webhook.MessageBuilder()
    .setName("Mail")
    .setColor("#aabbcc")
    .setDescription(`Nouveau message de **${req.body.prenom} ${req.body.nom}**`)
    .addField(`Email:`, req.body.email)
    .addField(`Sujet:`, req.body.sujet)
    .addField(`Message:`, req.body.message);
  Hook.send(msg);

  res.redirect('/')
}
exports.mention = (req, res) => {
  res.render('mention')
}
