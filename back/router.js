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

// Import Middleware
const mdl = require('./middleware/admin')

// Routes
router.route('/')
    .get(HomeController.homepage)

router.route('/blog')
    .get(BlogController.blogpage)


router.route('/contact')
    .get(ContactController.contactpage)

router.route('/admin')
    .get(mdl.isAdmin,AdminController.adminpage)

// router.route("/:id")
//     .get(HomeController.homepageID)

// /Routes

// Exports de notre router
module.exports = router
