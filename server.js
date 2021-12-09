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

// Route par défaut
const ROUTER = require('./back/router')
app.use('/', ROUTER)
/*

app.get('/', function (req, res) {
    res.render('home')
}) 
// Route Bruno
app.get('/bruno', function (req, res) {
    res.send('<h2>Team Bruno</h2>>')
})
// Route Admin
app.get('/admin', function (req, res) {
    res.redirect('/')
})

 */
// Lancement de l'app sur le port défini dans le .env
app.listen(process.env.PORT)