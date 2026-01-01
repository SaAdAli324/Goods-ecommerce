import mongoose from "mongoose";
import { type } from "os";
import { ref } from "process";

const cartSchema = new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId , 
        ref:"products",
        required:true
    },
    quantity:{
        type:Number,
        default:1,
        min:1 
    }
},{timestamps:true})


const signUpSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
        , minlength: [2, "Name must be more then two chracter"]
        , maxlength: [15, "Name can't exceed 15 character"]
    },
    email: {
        type: String,
        required: [true, "Email is required"]
        , unique: true

    },
    password: {
        type: String,
        required:[true , 'password is required']
    },
    address:{
        type:String,
        required:[true ,"Address is required"],
        minlength:[10,"Address must be more then 10 character"],
        maxlength:[50,"Address can't exceed 50 character"]
    },
    phoneNumber:{
        type:String,
        required:[true,"Phone number is required"],
        minlength:[10,"Phone number must be 10 digit"],
        unique:[true , "can't use this phone number  "]
    },
    googleId: {
        type: String
    },
    role:{
        type:String,
        enum:["user","admin","manager"],
        default:"user"
    },
    avatar: [{
        filename:{type: String},
        path:{type: String },
   
   }],
    cart:[cartSchema]
}, { timestamps: true })

export default mongoose.model("User", signUpSchema)