exports.get = (req, res) => {
    // SQL récupération de tout les users
    let sql = `SELECT * FROM user`;

    db.query(sql, (error, data, fields) => {
        if (error) throw error;
        res.json({
            status: 200,
            listUser: data,
            message: "users lists retrieved successfully"
        })
    })
}

exports.CreateUser = (req, res) => {

    // SQL pour creer un users
    let sql = `INSERT INTO user set nom=?, prenom=?, email=?, password=?, logo=?, ban=?, role=?`;
    let values = [
        req.body.nom,
        req.body.prenom,
        req.body.email,
        req.body.password,
        req.file.filename,
        true,
        req.body.selectRole
    ];
    db.query(sql, values, function (err, data, fields) {
        if (err) throw err;
        res.redirect('back')
    })
}

exports.multerPost = (req, res) => {
    console.log('LOG MULTER ', req.body)
    console.log('FILE ', req.files.length)
    res.redirect('back')
}
exports.multerGet = (req, res) => {
    res.render("dev")
}

exports.kill = (req, res) => {
    // const expressSession = require("express-session"),
    //     MySQLStore = require("express-mysql-session")(expressSession);
    // // Configuration Mysql pour se connecter a la DB
    // let configDB = {
    //     host: process.env.DB_HOST,
    //     user: process.env.DB_USER,
    //     password: process.env.DB_PASSWORD,
    //     database: process.env.DB_DATABASE
    // }
    // // Configuration Express-Session
    // var sessionStore = new MySQLStore(configDB);
    // // Récupération de toute les sessions
    // sessionStore.all(function (err, sessions) {
    //     var ss = sessions;
    //     // Boucle pour lister toute les sessionsID
    //     for (var sid in ss) {
    //         // Si la session est active
    //        if(ss[sid].user){
    //         // Log des session active    
    //         console.log('SES ',ss[sid].user.id) 
    //             // Si l'id de l'user de la sessions est égal a 1
    //             if(ss[sid].user.id == 1){
    //                 // Kill de la sessions
    //                 sessionStore.destroy(sid)
    //                 console.log('kill')
    //             }
    //        }
    //     }
    // });


    let sql = `SELECT * FROM sessions WHERE data LIKE '%"id":1%'`;

    db.query(sql, (error, sess, fields) => {
        if (error) throw error;
        for (var sid in sess) {
            console.log("TEST", sess[sid].session_id)
        }
    })
}
exports.page = (req, res) => {

    // // Nombre d'item par page
    // var perPage = 5
    // // La page que l'on veux récupéré si il y a en pas alors page 1
    // var page = req.query.page || 1
    // var arrayPagesIndexes = []

    // // Ici on recherche nos créations
    // let sql = `SELECT * FROM creations`;

    // db.query(sql, (error, Article, fields) => {
    //     if (error) throw error;
    // Article.find()
    //     // Ici On viens chercher l'index qui nous interesse
    //     // exemple: pour la page 2 avec 5 perPage = index 5
    //     // donc (5 * 2) - 5 = 5
    //     .skip((perPage * page) - perPage)
    //     // Ici on limite le nombre de résultat
    //     .limit(perPage)
    //     .lean()
    //     .exec((err, articles) => {
    //         if (err) console.log(err)
    //         // Ici on compte le nombre d'article total 
    //         Article.countDocuments()
    //             .exec((err, count) => {
    //                 if (err) return next(err)
    //                 // Ici on calcul le nombre de pages
    //                 var allPagesNumber = Math.ceil(count / perPage)
    //                 // On fait une boucle sur le nombre total de page
    //                 for (i = 0; i < allPagesNumber; i++) {
    //                     // On push nos index dans le tableau
    //                     arrayPagesIndexes.push(i + 1)
    //                 }
    //                 res.render('dev', {
    //                     // Page sur la quel on est : Number
    //                     current: page,
    //                     // Nombre de pages : Number
    //                     pages: Math.ceil(count / perPage),
    //                     // tableau avec les index des page: []
    //                     arrayPage: arrayPagesIndexes,
    //                     // Les artciles : [{}]
    //                     articles: articles,
    //                     // Pages - 1
    //                     previous: parseInt(page) - 1,
    //                     // Pages + 1
    //                     next: parseInt(page) + 1
    //                 })
    //             })
    //     })
    // })
    // res.render('page',{

    // })
    var numRows;
    var queryPagination;
    var numPerPage = parseInt(req.query.npp, 10) || 1;
    var page = parseInt(req.query.page, 10) || 0;
    var numPages;
    var skip = page * numPerPage;
    // Here we compute the LIMIT parameter for MySQL query
    var limit = skip + ',' + numPerPage;
    let configDB = {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    }
    var queryAsync = Promise.promisify(configDB.query.bind(configDB));
    queryAsync('SELECT count(*) as numRows FROM wp_posts')
        .then(function (results) {
            numRows = results[0].numRows;
            numPages = Math.ceil(numRows / numPerPage);
            console.log('number of pages:', numPages);
        })
        .then(() => queryAsync('SELECT * FROM wp_posts ORDER BY ID DESC LIMIT ' + limit))
        .then(function (results) {
            var responsePayload = {
                results: results
            };
            if (page < numPages) {
                responsePayload.pagination = {
                    current: page,
                    perPage: numPerPage,
                    previous: page > 0 ? page - 1 : undefined,
                    next: page < numPages - 1 ? page + 1 : undefined
                }
            } else responsePayload.pagination = {
                err: 'queried page ' + page + ' is >= to maximum page number ' + numPages
            }
            res.json(responsePayload);
        })
        .catch(function (err) {
            console.error(err);
            res.json({
                err: err
            });
        });
}