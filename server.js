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
    
// Configuration Mysql pour se connecter a la DB
db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});
// Conexion à la DB
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

// Helper Limitation pour n'afficher que un certain nombre max d'item
Handlebars.registerHelper('limit', function(ar, max){
    var db = ar.slice(0,max);
    return db;
  });

// Configuration de la route vers notre dossier static
app.use("/assets", express.static('public'));

// Import du Router
const ROUTER = require('./back/router')
app.use('/', ROUTER)

// Lancement de l'app sur le port défini dans le .env
app.listen(process.env.PORT)