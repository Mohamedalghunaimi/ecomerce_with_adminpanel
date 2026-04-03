const mongoose = require("mongoose")
require("dotenv").config()

const main = async()=> {
    await mongoose.connect(process.env.db_url)
}
const schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description: {
        type:String,
        required:true
    },
    price :{
        type:String,
        required:true
    },
    image:{
        type:Array,
        required:true
    },
    category : {
        type:String,
        required:true
    },
    subCategory : {
        type:String,
        required:true
    },
    sizes :{
        type:Array,
        required:true
    },
    bestSeller :{
        type:Boolean,
        required:true
    },
    date :{
        type:Date ,
        required:true
    }
},{minimize:false})
const Product = mongoose.model("product",schema)

module.exports = {
    Product,main
}