const {  admin, banUser, editUser, deleteCom } = require("./AdminController");
const { login, logout, register, logout } = require("./AuthController");
const { creaPage, creaID, creaCreate, creaEdit, creaDelete, } = require("./CreationsController");
const { home, form, mention } = require("./HomeController");
const { editProfile, getProfile, sendCom} = require("./UserController");

module.exports = {
    //Admin
    admin, banUser, editUser, deleteCom,

    // Auth
    login, logout, register, logout,

    // Creations
    creaPage, creaID, creaCreate, creaEdit, creaDelete,

    // Home
    home, form, mention,
    // User
    editProfile, getProfile, sendCom
}