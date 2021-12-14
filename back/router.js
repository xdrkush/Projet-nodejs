/*
 * Router.js
 * ********* */

// Import de module
const express = require('express')
const router = express.Router()

// Import des controllers
const HomeController = require('./controllers/HomeController')
const ContactController = require('./controllers/ContactController')
const BlogController = require('./controllers/BlogController')
const AdminController = require('./controllers/AdminController')
const AuthController = require('./controllers/AuthController')

// Import Middleware
const mdl = require('./middleware/middleware')

// Routes
router.route('/')
    .get(HomeController.homePage)

router.route('/login')
    .post(AuthController.authLogin)

router.route('/register') 
    .post(AuthController.authRegister)

router.route('/forgot')
    .post(AuthController.authForgot)

router.route('/logout') 
    .get(HomeController.homePage)
    .post(AuthController.authLogout)

router.route('/blog')
    .get(BlogController.blogPage)

router.route("/blog/article/:id")
    .get(mdl.articleID, BlogController.blogID)
    .put(mdl.isAdmin, mdl.editArticleID, BlogController.editArticle)
    .delete(mdl.isAdmin, mdl.editArticleID, BlogController.deleteArticle)

router.route('/contact')
    .get(ContactController.contactPage)
    .post(ContactController.sendMessage)
    
router.route('/admin')
    .get(mdl.isAdmin, AdminController.adminPage)

router.route('/ban/:id')
    .put(mdl.isAdmin, AdminController.banUser)

router.route('/editUser/:id')
    .put(mdl.isAdmin, AdminController.editUser)

router.route('/deleteCom/:id')
    .delete(mdl.isAdmin, AdminController.deleteCom)

// /Routes

// Exports de notre router
module.exports = router