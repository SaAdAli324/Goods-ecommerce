import mongoose, { Schema } from "mongoose";
import users from '../models/signUpModel.js'
const Cart = new mongoose.Schema({
    
    user_id:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    items:[{
        productId: { 
        type: Schema.Types.ObjectId, 
        ref: 'products', 
        required: true 
      },
      quantity: { 
        type: Number, 
        required: true, 
        min: 1,
        default: 1 
      }
    }]
})
export default mongoose.model("Cart" ,Cart )