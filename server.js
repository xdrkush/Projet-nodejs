/*
 * Server.js
 * Point d'entrée de l'application (Main / Root)
 * ********************************************* */ 

// Import de module
const
    express = require('express'),
    { engine } = require('express-handlebars'),
    env = require('dotenv').config(),
    app = express(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    multer = require('multer'),
    expressHbs =  require('express-handlebars'),
    Handlebars = require('handlebars'),
    mysql = require('mysql');
    
// Configuration Mysql
db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'projet_njs'
});

db.connect((err) => {
    if (err) console.error('error connecting: ' + err.stack);
    console.log('connected as id ' + db.threadId);
});

// Configuration Handlebars
app.set('view engine', 'hbs')
app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'main'
}))

// Configuration MethodOverride
app.use(methodOverride('_method'))

// Configuration BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


Handlebars.registerHelper('limit', function(ar, max){
    var db = ar.slice(0,max);
    return db;
  });


var hbs = expressHbs.create({});
hbs.handlebars.registerHelper('times', function(n, block) {
    var accum = '';
    for(var i = 0; i < n; ++i)
        accum += block.fn(i);
    return accum;
});

// Configuration de la route vers notre dossier static
app.use("/assets", express.static('public'));

// Import du Router
const ROUTER = require('./back/router')
app.use('/', ROUTER)

// Lancement de l'app sur le port défini dans le .env
app.listen(process.env.PORT)