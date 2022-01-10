/*
 * Controller: Home
 * **************** */
const webhook = require("webhook-discord");

exports.homePage = (req, res) => {
  // SQL récupération de tout les creations
  let sql = `SELECT * FROM creations ORDER BY id DESC`;

  db.query(sql, (error, data, fields) => {
    if (error) throw error;
    res.render('home', {
      title: `${process.env.ETP} - Accueil`,
      creationsItem: data,
      creations: Number(data.length)
    })
  })
}
exports.sendMessage = (req, res) => {
  console.log("controller send Message", req.body.email);
  const Hook = new webhook.Webhook("https://discord.com/api/webhooks/927493486775791636/2wNULa7aRP5Sz2Bgv4i2vShNEuQBfI6SO7Iz9egfnP_95gxUf5qulIE0nZLoRorak7L9");

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