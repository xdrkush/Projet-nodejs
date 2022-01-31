const {  admin, banUser, editUser } = require("./AdminController");
const { login, logout, register, forgot } = require("./AuthController");
const { creaPage, creaID, creaCreate, creaEdit, creaDelete, } = require("./CreationsController");
const { home, form, mention } = require("./HomeController");
const { editProfile, getProfile, sendCom, replyCom, deleteCom, likeCom} = require("./UserController");

module.exports = {
    //Admin
    admin, banUser, editUser, 

    // Auth
    login, logout, register, forgot,

    // Creations
    creaPage, creaID, creaCreate, creaEdit, creaDelete,

    // Home
    home, form, mention,

    // User
    editProfile, getProfile, sendCom, replyCom, deleteCom, likeCom
}