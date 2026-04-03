const { cloudinary } = require("../methods/cloundiary")
const { Product, main } = require("../models/product")


const addProduct =async(req,res,next)=> {
    
    const {
        name,
        description,
        price,
        category,
        subCategory,
        sizes,
        bestSeller,
    }= req.body
    console.log(req.body)
    try {
        const image1=req.files.image1&&req.files.image1[0]
        const image2=req.files.image2&&req.files.image2[0]
        const image3=req.files.image3&&req.files.image3[0]
        const image4=req.files.image4&&req.files.image4[0] 
        const images =[image1,image2,image3,image4].filter((e)=> {
            if(e) {
                return true
            }
            return false
        })
        const imageUrl = await Promise.all(
            images.map(async(e)=> {
            const result = await cloudinary.uploader.upload(e.path,{source_type:"image"})
            return result.secure_url 
            })
        )        
        await main();
        const newProduct = new Product({
            name,
            description,
            price:Number(price),
            image:[...imageUrl],
            category,
            subCategory,
            bestSeller,
            sizes:JSON.parse(sizes),
            date:Date.now()
        })
        await newProduct.save();
        res.json({
            success:true,
            message:"product is added"
        })

    }catch(err) {
        res.json({success:false,message:err.message})
    }
}

const listProduct = async(req,res,next)=> {
    try {
        await main();
        const products = await Product.find({},{_v:false}
        )
        res.json({
            success:true,
            products
        })

    }catch(err) {
        res.json({
            success:false,
            message:err.message
        })
    }
}
const singleProduct = async(req,res,next)=> {
    const {id} = req.body
    try {
        await main()
        const singleProduct = await Product.findById(id)
        if(!singleProduct) {
            return res.json({success:false,message:"user is not found"})
        }
        return res.json({
            success:false,
            singleProduct
        })
    }catch(err) {
            return res.json({success:false,message:err.message})

    }
}

const removeProduct = async (req,res,next)=> {
    const {id} = req.body
    try {
        await main()
        const removeProduct = await Product.findByIdAndDelete(id)
        res.json({
            success:true,
            removeProduct
        })


    }catch(err) {
        res.json({
            success:false,
            message:err.message
        })
    }
}


module.exports = {
    addProduct,listProduct,singleProduct,removeProduct
}