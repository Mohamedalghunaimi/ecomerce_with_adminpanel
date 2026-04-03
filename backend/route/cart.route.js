const { authUser } = require("../middlewares/authUser")
const { addToCart, updateCart, removeFromCart, getCart } = require("../controllers/cart.controller")

const cartRouter = require("express").Router()
cartRouter.route("/getcart").get(authUser,getCart)
cartRouter.route("/add").post(authUser,addToCart)
cartRouter.route("/update").post(authUser,updateCart)
cartRouter.route("/remove").post(authUser,removeFromCart)

module.exports = {
    cartRouter
}