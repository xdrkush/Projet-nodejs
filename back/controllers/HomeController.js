/*
 * Controller: Home
 * **************** */
const webhook = require("webhook-discord");

exports.homePage = (req, res) => {
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

  var nbr = Number(process.env.SESSID)
  nbr -= 1

  res.render('home', {
    title: `${process.env.ETP} - Home`,
    session: sess,
    isAdmin: admin,
    creationsItem: fakedb.creations,
    userLog: fakedb.user[nbr]
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