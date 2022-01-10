const fakedb = require('../../public/data/db.json');
const dbArticles = require('../../public/data/db.json').creations;
const fs = require("fs");

exports.creationsPage = (req, res) => {

  let sql = `SELECT * FROM creations ORDER BY id DESC`;

  db.query(sql, (error, data, fields) => {
    let sqlGet = `SELECT * FROM images`;

    db.query(sqlGet, (error, data2, fields) => {
      if (error) throw error;
      res.render('creations', {
        title: `${process.env.ETP} - Création`,
        creationsItem: data,
        images: data2
      })
    })
  })


}

exports.creationsID = (req, res) => {

  let sql = `SELECT * FROM creations WHERE id = ${req.params.id}`;

  db.query(sql, (error, data, fields) => {
    let sqlGet = `SELECT * FROM images WHERE img_id = ${req.params.id}`;

    db.query(sqlGet, (error, data2, fields) => {
     
      if (error) throw error;
      res.render("article", {
        title: `${process.env.ETP} - Articles`,
        data,
        data2,
        parms: data2[0].id
      });
    })
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

exports.createArticle = async (req, res) => {
  const {
    Timestamp
  } = require("@sapphire/time-utilities");
  const dateDay = `${new Timestamp("DD-MM-YYY à HH:mm")}`;

  // SQL pour creer un article
  let sql = `INSERT INTO creations set description=?, img=?, date=?, destroy=?`;
  let values = [
    req.body.desc,
    req.files[0].filename,
    dateDay,
    false
  ];
  db.query(sql, values, function (err, data1, fields) {
    if (err) throw err;

    let sqlGet = `SELECT * FROM creations ORDER BY ID DESC LIMIT 1;`;
    db.query(sqlGet, values, async function (err, data2, fields) {
      if (err) throw err;

      for (i = 0; i < req.files.length; i++) {
        let sqlSet = `INSERT INTO images SET img_url=?, img_id=?`;

        let values = [
          req.files[i].filename,
          data2[0].id
        ]

        db.query(sqlSet, values, function (err, data3, fields) {
          if (err) throw err;
        })
      }
      await res.redirect('back')
    })
  })
};