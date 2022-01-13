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
            console.log("TEST",sess[sid].session_id)
        }
    })
}