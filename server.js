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
    mysql = require('mysql'),
    expressSession = require("express-session"),
    MySQLStore = require("express-mysql-session")(expressSession);
    
// Configuration Mysql pour se connecter a la DB
let configDB = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
}

// MYSQL
db = mysql.createConnection(configDB);
db.connect((err) => {
    if (err) console.error('error connecting: ' + err.stack);
    console.log('connected as id ' + db.threadId);
});

// Configuration Handlebars
const { condIff, incUp, incDown, limite, iffpage } = require('./back/helpers/hbs')

app.set('view engine', 'hbs')
app.engine('hbs', engine({
  helpers: {
      iff: condIff,
      incUp: incUp,
      incDown: incDown,
      limit: limite,
      iffpage
  },
  extname: 'hbs',
  defaultLayout: 'main'
}));

// Configuration Express-Session
var sessionStore = new MySQLStore(configDB);

// Express-session
app.use(
  expressSession({
    secret: "securite",
    name: "htr",
    saveUninitialized: true,
    resave: false,
    store: sessionStore
  })
);
// Session Connexion for HBS
app.use('*', (req, res, next) => {
  res.locals.user = req.session.user;
  next();
})

// Configuration MethodOverride
app.use(methodOverride('_method'))

// Configuration BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// Met le site en 404
// app.use('*',function(req, res){
//   res.status(404).render("error404", {layout: false});
// });

// Configuration de la route vers notre dossier static
app.use("/assets", express.static('public'));

// Import du Router
const ROUTER = require('./back/router')
app.use('/', ROUTER)

// Lancement de l'app sur le port défini dans le .env
app.listen(process.env.PORT)