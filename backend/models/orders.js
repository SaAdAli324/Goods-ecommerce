import mongoose from "mongoose";

const Order = new mongoose.Schema({
 
   user: {
      userId: {
       type: mongoose.Schema.Types.ObjectId,
         ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },

    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        priceAtPurchase: {
          type: Number, 
        },
      },
    ],

    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },

    totalAmount: {
      type: Number,
      required: true,
    },
    
},{timestamps:true})

export default mongoose.model("order" , Order)