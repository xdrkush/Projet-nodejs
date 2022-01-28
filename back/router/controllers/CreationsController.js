/*
 * Controller: Créations
 * **************** */
const { log, Console } = require("console");
const fs = require("fs");

exports.creaPage = (req, res) => {
  var numRows;
  var numPerPage = 6;
  var page = parseInt(req.query.page, 10) || 0;
  var numPages;
  var skip = page * numPerPage;
  var limit = skip + ',' + numPerPage;

  let sql = `SELECT count(*) as numRows FROM creations`;
  db.query(sql, (error, results, fields) => {
    if (error) throw error;
    numRows = results[0].numRows;
    numPages = Math.ceil(numRows / numPerPage);
  })

  let sqlget = `SELECT * FROM creations ORDER BY ID DESC LIMIT ${limit}`
  db.query(sqlget, (error, results, fields) => {
    if (error) throw error;
    var responsePayload = {
      results: results
    };
    if (page < numPages) {
      responsePayload.pagination = {
        current: page,
        perPage: numPerPage,
        previous: page > 0 ? page - 1 : undefined,
        previousbis: page > 0 ? page - 2 : undefined,
        next: page < numPages - 1 ? page + 1 : undefined,
        nextbis: page < numPages - 1 ? page + 2 : undefined
      }
      res.render('creations', {
        title: `${process.env.ETP} - Création`,
        creationsItem: results,
        page: responsePayload.pagination
      })
    } else {
      res.redirect('/')
    }
  })
}

exports.creaID = async (req, res) => {

  const getCreations = await db.query(`SELECT * FROM creations WHERE id = ${req.params.id}`);
  const GetImgCrea = await db.query(`SELECT * FROM images WHERE id_creations = ${req.params.id}`);
  const listComment = await db.query(`SELECT * FROM commentaires WHERE id_articles = ${ req.params.id }`);
  let construct = []
  // let ArticleID = {
  //   getCreations,
  //   comment: construct
  // }

  listComment.map(async (el, index) => {
    // if (el) {}
    const child = await db.query(`SELECT * FROM commentaires WHERE id_com_parent = '${ el.id }';`)
    el.child = child
    

    // child.map(async (ell, index) => {
    //   const childbis = await db.query(`SELECT * FROM commentaires WHERE id_com_parent = '${ el.id }';`)
    //   ell.child = childbis
    //   construct.push(ell)
    // })
  //console.log('com child', el)
    construct.push(el)
  });

  //console.log('getCreations', construct)

  res.render("article", {
    title: `${process.env.ETP} - Articles`,
    getCreations: getCreations[0],
    GetImgCrea,
    parms: GetImgCrea[0].id,
    listComment:construct,
    kush: {name: 'Bruno'},
    axel: {name: 'Axel'},
  }); 

}
exports.creaEdit = (req, res) => {
  let sqlGet = `SELECT * FROM creations WHERE id = ${req.params.id}`;
  db.query(sqlGet, (error, dataGet, fields) => {
    if (error) throw error;

    let values = [
      req.body.description,
    ];

    let sql = `UPDATE creations SET description=? WHERE id = ${req.params.id} `;
    db.query(sql, values, function (err, data2, fields) {
      if (err) throw err;
      res.redirect('back')
    })
  })

};

exports.creaDelete = (req, res) => {
  let sql = `UPDATE creations SET isDelete=1 WHERE id = ?`
  db.query(sql, req.params.id, (err) => {
    if (err) throw err
    res.redirect('back');
  })
};

exports.creaCreate = async (req, res) => {

  // SQL pour creer un article
  const { desc } = req.body;
  const addCrea = await db.query(`INSERT INTO creations (description, isDelete) VALUES ( '${desc}', 0 );`);
  console.log(addCrea.insertId)
  let sqlGet = `SELECT * FROM creations ORDER BY ID DESC LIMIT 1;`;
  db.query(sqlGet, async function (err, data2, fields) {
    if (err) throw err;

    for (i = 0; i < req.files.length; i++) {
      let sqlSet = `INSERT INTO images SET img_url=?, id_creations=?`;

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
};