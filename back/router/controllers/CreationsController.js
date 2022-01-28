/*
 * Controller: Créations
 * **************** */

exports.creaPage = (req, res) => {
  var numRows;
  var numPerPage = 1;
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

  let sqlget = `SELECT creations.id, creations.description, creations.date, creations.isDelete, images.img_url
                        FROM creations 
                        INNER JOIN images
                        ON images.id_creations = creations.id
                        ORDER BY ID DESC LIMIT ${limit}`
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
      console.log(responsePayload.pagination)
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
  const listComment = await db.query(`SELECT * FROM commentaires WHERE id_articles = ${req.params.id}`);
  let construct = []
  
  // console.log("listcom",listComment)

  listComment.map(async (el, index) => {
    const child = await db.query(`SELECT * FROM commentaires WHERE id_com_parent = '${el.id}';`)
    console.log('child', child)
    el.child = child
    construct.push(el)
  });
  console.log('constr',construct)

  // let ArticleID = {
  //   getCreations: getCreations[0],
  //   GetImgCrea,
  //   parms: GetImgCrea[0].id,
  //   comment: construct
  // }

  console.log(construct)
  res.render("article", {
    title: `${process.env.ETP} - Articles`,
    getCreations: getCreations[0],
    GetImgCrea,
    parms: GetImgCrea[0].id,
    listComment: construct
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