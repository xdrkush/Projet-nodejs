/*
 * Router.js
 * ********* */

// Import de module
const express = require('express')
const router = express.Router()
const uploadUser = require('./config/multer_user')
const uploadCreations = require('./config/multer_creations')
// Import des controllers
const HomeController = require('./controllers/HomeController')
const CreationsController = require('./controllers/CreationsController')
const AdminController = require('./controllers/AdminController')
const AuthController = require('./controllers/AuthController')
const UserEditProfil = require('./controllers/UserController')
const DevController = require('./controllers/DevController')

// Import Middleware
const mdl = require('./middleware/middleware')

// Routes
router.route('/')
    .get(HomeController.homePage)

router.route('/contact')
    .post(HomeController.sendMessage)

// Auth 
router.route('/login')
    .post(mdl.isBan, AuthController.authLogin)

router.route('/register')
    .post(uploadUser.single('logo'), AuthController.authRegister)

router.route('/forgot')
    .post(AuthController.authForgot)

router.route('/logout')
    .get(HomeController.homePage)
    .post(AuthController.authLogout)

// Créations
router.route('/creations')
    .get(CreationsController.creationsPage)

router.route("/creations/:id")
    .get(CreationsController.creationsID)



// Client 
router.route('/profil/edit/:id')
    .put(mdl.SessionsActive, uploadUser.single('avatar'), UserEditProfil.editUserProfil)

/////// Administration ///////
router.route('/admin')
    .get(mdl.isAdmin, AdminController.adminPage)

// Créations
router.route('/create/article')
    .post(mdl.isAdmin, uploadCreations.array('avatar'), CreationsController.createArticle)

router.route("/creations/edit/:id")
    .put(mdl.isAdmin, CreationsController.editArticle)

router.route('/creations/delete/:id')
    .delete(mdl.isAdmin, CreationsController.deleteArticle)

// Utilisateur
router.route('/create/user')
    .post(mdl.isAdmin, uploadUser.single('avatar'), AdminController.createUser)

router.route('/edit/user/:id')
    .put(mdl.isAdmin, uploadUser.single('avatar'), AdminController.editUser)

router.route('/ban/user/:id')
    .put(mdl.isAdmin, AdminController.banUser)

// Commentaire
router.route('/deleteCom/:id')
    .delete(mdl.isAdmin, AdminController.deleteCom)

/////// Dev ///////
router.route('/test')
    .get(mdl.isAdmin, CreationsController.creationsPage)
    .post(mdl.isAdmin, uploadCreations.single('avatar'), CreationsController.creationsPage)

router.route('/dev')
    .get(mdl.isAdmin, DevController.page)

router.route('/dev/upload')
    .post(mdl.isAdmin, uploadCreations.array('avatar'), DevController.multerPost)

router.route('/kill')
    .get(mdl.isAdmin, DevController.kill)

router.route('/api')
    .get(mdl.isAdmin,DevController.get)

    // /Routes

// Exports de notre router
module.exports = router