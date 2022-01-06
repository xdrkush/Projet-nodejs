exports.get = async (req, res) => {
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

exports.CreateUser = async (req, res) => {

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
        // SQL récupération de tout les users
        let sql = `SELECT * FROM user`;
        
        db.query(sql, (error, dataRes, fields) => { 
            if (error) throw error;
            res.redirect('back')
        })
    })
}