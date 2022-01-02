/*
 * Router.js
 * ********* */

// Import de module
const express = require('express')
const router = express.Router()
const upload = require('./config/multer')

// Import des controllers
const HomeController = require('./controllers/HomeController')
const CreationsController = require('./controllers/CreationsController')
const AdminController = require('./controllers/AdminController')
const AuthController = require('./controllers/AuthController')
const UserEditProfil = require('./controllers/UserController')

// Import Middleware
const mdl = require('./middleware/middleware')

// Routes
router.route('/')
    .get(HomeController.homePage)
    .post(HomeController.sendMessage)

// Auth 
router.route('/login')
    .post(AuthController.authLogin)

router.route('/register')
    .post(AuthController.authRegister)

router.route('/forgot')
    .post(AuthController.authForgot)

router.route('/logout')
    .get(HomeController.homePage)
    .post(AuthController.authLogout)

// Créations
router.route('/creations')
    .get(CreationsController.creationsPage)

router.route("/creations/:id")
    .get(mdl.articleID, CreationsController.creationsID)

router.route("/creations/edit/:id")
    .put(mdl.isAdmin, mdl.editArticleID, CreationsController.editArticle)

router.route('/creations/delete/:id')
    .delete(mdl.isAdmin, mdl.editArticleID, CreationsController.deleteArticle)

// Client
router.route('/profil/edit/:id')
    .put(mdl.SessionsActive, upload.single('avatar'), UserEditProfil.editUserProfil)

// Administration   
router.route('/admin')
    .get(mdl.isAdmin, AdminController.adminPage)

router.route('/ban/:id')
    .put(mdl.isAdmin, AdminController.banUser)

router.route('/editUser/:id')
    .put(mdl.isAdmin, AdminController.editUser)

router.route('/deleteCom/:id')
    .delete(mdl.isAdmin, AdminController.deleteCom)

// Dev
router.route('/test')
    .get(CreationsController.creationsPage)
    .post(upload.single('avatar'), CreationsController.creationsPage)

// /Routes

// Exports de notre router
module.exports = router