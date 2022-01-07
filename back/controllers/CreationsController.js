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

  let sql = `SELECT * FROM creations`;

  db.query(sql, (error, data, fields) => {
    if (error) throw error;
    res.render('creations', {
      title: `${process.env.ETP} - Création`,
      session: sess,
      isAdmin: admin,
      creationsItem: data,
      userLog: fakedb.user[nbr]
    })
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

  let sql = `SELECT * FROM creations WHERE id = ${req.params.id}`;

  db.query(sql, (error, data, fields) => {
    if (error) throw error;
    res.render("article", {
      title: `${process.env.ETP} - Articles`,
      session: sess,
      isAdmin: admin,
      data
    });
  })

};

exports.editArticle = (req, res) => {
  let sqlGet = `SELECT * FROM creations WHERE id = ${req.params.id}`;
 
  db.query(sqlGet, (error, dataGet, fields) => {
    if (error) throw error;
    
    let values = [
      req.body.img,
      req.body.description,
      req.body.date
    ];
    
    let sql = `UPDATE creations SET img=?, description=?, date=? WHERE id = ${req.params.id} `;
    
    db.query(sql, values, function (err, data2, fields) {
      if (err) throw err;
      res.redirect('back')
    })
  })

};

exports.deleteArticle = (req, res) => {
  let sql = `DELETE FROM creations WHERE id = ?`

    db.query(sql, req.params.id, (err) => {
      if (err) throw err
        res.redirect('back');
    })
};

exports.createArticle = (req, res) => {
  const { Timestamp } = require("@sapphire/time-utilities");
  const dateDay = `${new Timestamp("DD-MM-YYY à HH:mm")}`;

  // SQL pour creer un article
  let sql = `INSERT INTO creations set img=?, description=?, date=?`;
  let values = [
    req.file.filename,
    req.body.desc,
    dateDay
  ];
  db.query(sql, values, function (err, data, fields) {
    if (err) throw err;
    res.redirect('back')

  })
};
