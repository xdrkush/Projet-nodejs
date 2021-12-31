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
    multer = require('multer');
    
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

// Configuration de la route vers notre dossier static
app.use("/assets", express.static('public'));

// Import du Router
const ROUTER = require('./back/router')
app.use('/', ROUTER)

// Lancement de l'app sur le port défini dans le .env
app.listen(process.env.PORT)