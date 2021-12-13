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
    .get(HomeController.homepage)
    .post(AuthController.authLogin)

router.route('/register') 
    .get(AuthController.authRegister)
    .post(AuthController.authRegister)

router.route('/blog')
    .get(BlogController.blogpage)

router.route("/blog/article/:id")
    .get(mdl.articleID, BlogController.blogID)

router.route("/blog/edit/:id")
    .get(mdl.isAdmin, mdl.editArticleID, BlogController.editArticle)
    .put(mdl.isAdmin, mdl.editArticleID, BlogController.editArticle)

router.route("/blog/delete/:id/")
    .get(mdl.isAdmin, mdl.editArticleID, BlogController.deleteArticle)
    .delete(mdl.isAdmin, mdl.editArticleID, BlogController.deleteArticle)

router.route('/contact')
    .get(ContactController.contactpage)
    .post(ContactController.sendMessage)
    
router.route('/admin')
    .get(mdl.isAdmin, AdminController.adminpage)



// /Routes

// Exports de notre router
module.exports = router