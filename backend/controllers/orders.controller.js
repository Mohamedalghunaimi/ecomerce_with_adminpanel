const {Order} = require("../models/orders")
const {main} = require("../models/product");
const { User } = require("../models/user");
require("dotenv").config()

const stripe = require('stripe')(process.env.Stripe_secret);




/* for user */
const getOrders = async (req,res,next)=> {
    const userId = req.id
    try {
        await main();
        const orders = await Order.find({
            userId
        })
        if(!orders.length) {
            return res.json({
                success:false,
                message:"There is no orders"
            })
        }
        return res.json({
            success:true,
            orders
        })
    }catch(error) {
        res.json({
            success:false,
            message:"something went wrong in the server"
        })
    }
}
/// by cod
const setOrders = async (req,res,next) => {
    const userId = req.id
    const {address,amount,items,paymentMethod='CMD'} = req.body;
    if(!address || !amount || !items ) {
        return res.json({
            success:false,
            message:"missing details"
        })
    }
    try {
        await main()
        const order = await Order.findOne({userId})
        if(!order) {
            const newOrder = new Order({
                userId,
                address,
                amount,
                items,
                paymentMethod,
                status:"place order",
                date:Date.now()
            })
            await newOrder.save()
        }
        else {
            order.items = [...order.items,...items];
            order.address=address;
            order.amount+= amount ;
            order.paymentMethod=paymentMethod
            order.date=Date.now();
            await order.save()
        }
        const user = await User.findById(userId)
        user.cartData={}
        await user.save()

        res.json({
            success:true
        })
    }catch(error) {
        console.log(error)
        res.json({
            success:true,
            message:"something went wrong in the server"
        })

    }
}
const setOrderByStripe = async(req,res,next)=> {
    const userId = req.id
    const {address,amount,items,paymentMethod} = req.body;
    const {origin} = req.headers
    try {
        await main();
        let order = await Order.findOne({userId})
        let newOrder;
        if(!order) {
            const newOrder = new Order({
                userId,
                address,
                amount,
                items,
                paymentMethod,
                status:"place order",
                date:Date.now()
            })
            newOrder =await newOrder.save()
        }
        else {
            order.items = [...order.items,...items];
            order.address=address;
            order.amount+= amount ;
            order.paymentMethod=paymentMethod
            order.date=Date.now();
            newOrder = await order.save()
        }
        const line_items = items.map((item)=> {
            return {
                price_data :{
                    currency : "usd",
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100
                },
                quantity:item.quantity
            }
        })
        line_items.push({
            price_data :{
                currency : "usd",
            product_data:{
                name:"delivery fee"
            },
            unit_amount:10*100
            },
            quantity:1
        })
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url:  `${origin}/verify?success=false`
    })
    res.json({
        success:true,
        session_url:session.url
    })
    } catch(error) {
        console.log(error)
        res.json({
        success:false,
        message:error.message
    })

}

}
const allOrders = async (req,res,next)=> {
    try {
        await main();
        const allOrders = await Order.find({})
        res.json({
            success:true,
            allOrders
        })
    } catch (error) {
        res.json({
            success:false,
            message:"something went wrong in the server"
        })
        
    }
}
const changeStatus = async (req,res,next)=> {
    const {status,id} = req.body;
    if(!status || !id)  {
        return res.json({
            success:false,
            message:"missing details"
        })

    }
    try {
        await main();
        const order = await Order.findById(id);
        if(!order) {
            return res.json({
                success:false,
                message:"order not found"
            })
        }
        order.status = status
        await order.save();
        res.json({
            success:true,
            newOrder:order
        })

    } catch (error) {
        res.json({
            success:false,
            message:"something went wrong in the  server"
        })
        
    }

}
const verify = async (req,res,next) => {
    const {success=false,orderId} = req.body
    const userId = req.id;
    if(!orderId) {
        return res.json({
            success:false,
            message:"missing details"
        })
    }

    try {
        await main();
        if(success) {
        const user = await User.findById(userId)
        user.cartData = {};
        await user.save();
        const order = await Order.findById(orderId);
        if(!order) {
            return res.json({
                success:false,
                message:"order not found"
            })
        }
        order.payment=true;
        await order.save()
        res.json({
            success:true
        })
        } else {
            const order = await Order.findByIdAndDelete(orderId)
            res.json({
                success:false
            })
        }
    } catch (error) {
        res.json({
            success:false,
            message:"something went wrong in the  server"
        })
        
    }
}

module.exports = {
    getOrders,setOrders,allOrders,changeStatus,setOrderByStripe,verify
}