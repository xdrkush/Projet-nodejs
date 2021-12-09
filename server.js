const
    express = require('express'),
    { engine } = require('express-handlebars'),
    env = require('dotenv').config(),
    app = express();

//
app.set('view engine', 'hbs')
app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'main'
}))

// Router
const ROUTER = require('./back/router')
app.use('/', ROUTER)

app.use("/assets", express.static('public'));

// Lancement de l'app sur le port défini dans le .env
app.listen(process.env.PORT)