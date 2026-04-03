const bodyParser = require("body-parser");
const express = require("express")
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { authRouter } = require("./route/auth.route");
const { productRouter } = require("./route/product.route");
const { cartRouter } = require("./route/cart.route");
const { ordersRouter } = require("./route/orders.route");
const { verify } = require("./controllers/orders.controller");
const { authUser } = require("./middlewares/authUser");
const app = express();
require("dotenv").config()
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors({
  origin: ['http://localhost:3000',"http://localhost:5173"],
  credentials: true
}))
app.use(cookieParser())

app.use("/api/auth",authRouter)
app.use("/api/cart",cartRouter)
app.use("/product",productRouter)
app.use("/api/orders",ordersRouter)
app.post("/verify",authUser,verify)

app.listen(process.env.Port||5000,()=> {
    console.log(`welcome from port ${process.env.PORT}`)
})