/*
 * Router.js
 * ********* */

// Import de module
const express = require('express')
const router = express.Router()
const uploadUser = require('../config/multer_user')
const uploadCreations = require('../config/multer_creations')
// Import des controllers
const { admin, banUser, editUser, deleteCom, login, logout, register, forgot, creaPage, creaID, creaCreate, creaEdit, creaDelete, home, form, mention, editProfile, getProfile, sendCom, replyCom} = require("./controllers");

// Import Middleware
const mdl = require('../middleware/middleware');
const { Router } = require('express');

// Routes
router.route('/').get(home)
router.route('/contact').post(form)
router.route('/mention-legales').get(mention)


// Auth 
router.route('/login').post(mdl.isBan, mdl.isArchive, login)
router.route('/register').post(uploadUser.single('logo'), register)
router.route('/forgot').post(mdl.isBan, mdl.isArchive, forgot)
router.route('/logout').post(mdl.SessionsActive, logout)


// Créations
router.route('/creations').get(creaPage)
router.route("/creations/:id").get(creaID)


// Client 
router.route('/profile').get(mdl.SessionsActive, getProfile)
router.route('/profile/edit/:id').put(mdl.SessionsActive, uploadUser.single('avatar'), editProfile)


/////// Administration ///////
router.route('/admin').get(mdl.isAdmin, admin)

// Créations
router.route('/create/article').post(mdl.isAdmin, uploadCreations.array('avatar'), creaCreate)
router.route("/creations/edit/:id").put(mdl.isAdmin, creaEdit)
router.route('/creations/delete/:id').delete(mdl.isAdmin, creaDelete)

// Utilisateur
router.route('/edit/user/:id').put(mdl.isAdmin, uploadUser.single('avatar'), editUser)
router.route('/ban/user/:id').put(mdl.isAdmin, banUser)

// Commentaire
router.route('/deleteCom/:id').delete( deleteCom)
router.route('/send/commentaire/:id').post( sendCom)
router.route('/reply/commentaire/:id').post( replyCom)

    // /Routes

// Exports de notre router
module.exports = router