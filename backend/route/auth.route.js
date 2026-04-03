const { register, login, loginAsAdmin } = require("../controllers/auth.controller");

const authRouter = require("express").Router();
authRouter.route("/register").post(register)
authRouter.route("/login").post(login)
authRouter.route("/admin/login").post(loginAsAdmin)



module.exports = {
    authRouter
}