const { authUser } = require("../middlewares/authUser")
const { authAdmin } = require("../middlewares/authAdmin")
const {getOrders,setOrders, allOrders, changeStatus,setOrderByStripe} = require("../controllers/orders.controller")

const ordersRouter = require("express").Router();
ordersRouter.route("/getorders").get(authUser,getOrders)
ordersRouter.route("/setorders").post(authUser,setOrders)
ordersRouter.route("/setordersbystripe").post(authUser,setOrderByStripe)
ordersRouter.route("/allorders").get(authAdmin,allOrders)
ordersRouter.route("/changestatus").post(authAdmin,changeStatus)

module.exports ={
    ordersRouter
}

