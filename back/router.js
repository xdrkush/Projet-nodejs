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
const ArticleController = require('./controllers/BlogController')
const AdminController = require('./controllers/AdminController')

// Import Middleware
const mdl = require('./middleware/middleware')

// Routes
router.route('/')
    .get(HomeController.homepage)

router.route('/blog')
    .get(BlogController.blogpage)

router.route("/blog/:id")
    .get(mdl.articleID, ArticleController.blogID)

router.route('/contact')
    .get(ContactController.contactpage)

router.route('/admin')
    .get(mdl.isAdmin, AdminController.adminpage)



// /Routes

// Exports de notre router
module.exports = router
