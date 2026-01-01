import mongoose from "mongoose";
import Order from "../models/orders.js";
import productModel from "../models/productModel.js"
import User from "../models/signUpModel.js"
import orders from "../models/orders.js";


export const getOrdersForAdmin= async (req , res)=>{
    try {
        const orders = await Order.find()
        if (!orders) {
            return res.status(404).json({message:"no orders to show"})
        }
       console.log(orders);
       
        res.json({message:"got the orders" , success:true , order:orders})
    } catch (error) {
        console.log("server error while fetching orders" , error)
        res.status(500).json({message:"something went wrong try again/refresh", success:false})
        
    }
}

export const getOrders= async (req , res)=>{
    try {
        const userOrders = await Order.find({"user.userId":req.user._id}).populate("products.productId")
        console.log( "this is the user orders",userOrders);
        
        console.log( "these are the orders", Order);
        if (!userOrders) {
            return res.status(404).json({message:"no orders to show"})
        }
        if(userOrders.status==="cancelled"){
            return res.status(404).json({message:"no orders to show"})
        }
        res.json({message:"got the orders" , success:true , order:userOrders})
    } catch (error) {
        console.log("server error while fetching orders" , error)
        res.status(500).json({message:"something went wrong try again/refresh", success:false})
        
    }
}

export const postOrders = async (req,res) => {

    try {

        const userId = req.user._id
        const { quantity, productId, amount }=req.body
        console.log("this is the body", quantity , productId , amount);
        const objProductId = new mongoose.Types.ObjectId(productId)
        const users = await User.findById(userId)
        const objUserId = new mongoose.Types.ObjectId(users._id)
        console.log(users._id);
        
        if (!users) {
            return res.status(404).json({message:"user not found!" , success:false})
        }
        
        const orders = new Order({
            user: {
                userId: objUserId,
                name: users.name,
                address: users.address,
                phone: users.phoneNumber,
                email: users.email,
            },
            products: [{
                productId: objProductId,
                quantity:quantity,
                priceAtPurchase: amount

            }],
            totalAmount: quantity ? quantity * amount : amount
        })

        await orders.save();

        res.status(201).json({
            success: true,
            message: "Order created successfully!",
            orders,
        });


    } catch (err) {
        console.error("Error creating order:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const updateOrder = async (req , res)=>{
try {
    const {orderId}= req.params
    const {status}= req.body
    console.log(status);
    
if (status !=="Cancelled") {
   console.log("Unauthorized");
   res.status(403).json({message:"Unatuhorized" , success:false})
   return
}
    const userOrder = await Order.findByIdAndUpdate({_id:orderId , "user.userId":req.user._id},{status:status},{new:true})
    if (!userOrder) {
        return res.status(404).json({message:"something went wrong could'nt find the order", success:false})
    
    }
  
    console.log(userOrder);
     const updatedUserOrders = await Order.find({"user.userId":req.user._id}).populate("products.productId")
    
    
        res.json({message:`order ${status}`  , success:true , order:updatedUserOrders})
        return

} catch (error) {
    res.status(500).json({message:"server error " , error})
    console.log( "server error",error);
    
}
}

export const updateOrderByAdmin = async (req , res)=>{
try {
    const {orderId}= req.params
    const {status}= req.body
    console.log(status);
    
    if (status==="Delivered") {
        const productId = await Order.findById({id:orderId}).select("products.productId")
        console.log(productId);
        return
    }

    const userOrder = await Order.findByIdAndUpdate({_id:orderId , "user.userId":req.user._id},{status:status},{new:true})
    if (!userOrder) {
        return res.status(404).json({message:"something went wrong could'nt find the order", success:false})
    
    }
  
    console.log(userOrder);
     const updatedUserOrders = await Order.find({"user.userId":req.user._id}).populate("products.productId")
    
    
        res.json({message:`order ${status}`  , success:true , order:updatedUserOrders})
        return

} catch (error) {
    res.status(500).json({message:"server error " , error})
    console.log( "server error",error);
    
}
}