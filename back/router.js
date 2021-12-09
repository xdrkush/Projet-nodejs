const express = require('express')
const router = express.Router()

const HomeController = require('./controllers/HomeController')
const ContactController = require('./controllers/ContactController')

router.route('/')
    .get(HomeController.homepage)

router.route("/:id")
    .get(HomeController.homepageID)
    
router.route('/contact')
    .get(ContactController.contactpage)

module.exports = router