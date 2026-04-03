const { addProduct, listProduct, singleProduct, removeProduct } = require("../controllers/product.controller");
const { upload } = require("../methods/multer");
const { authAdmin } = require("../middlewares/authAdmin");

const productRouter = require("express").Router();
productRouter.route("/add").post(authAdmin,upload.fields([{
    name:"image1",
    maxCount:1
},
{
    name:"image2",
    maxCount:1
},
{
    name:"image3",
    maxCount:1
},
{
    name:"image4",
    maxCount:1
}]),addProduct)

productRouter.route("/listproduct").get(listProduct)
productRouter.route("/singleproduct").post(singleProduct)
productRouter.route("/removeproduct").post(authAdmin,removeProduct)


module.exports = {
    productRouter
}

