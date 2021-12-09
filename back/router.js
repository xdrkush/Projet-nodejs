const express = require('express')
const router = express.Router()

const HomeController = require('./controllers/HomeController')
const ContactController = require('./controllers/ContactController')
const BlogController = require('./controllers/BlogController')

router.route('/')
    .get(HomeController.homepage)

// router.route("/:id")
//     .get(HomeController.homepageID)

router.route('/blog')
    .get(BlogController.blogpage)


router.route('/contact')
    .get(ContactController.contactpage)

module.exports = router