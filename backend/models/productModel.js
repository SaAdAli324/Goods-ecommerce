import mongoose from "mongoose";


const productModel = new mongoose.Schema({
    productImage: [{
        filename: { type: String, required: true },
        path: { type: String, required: true }
    }],
    
    productName: {
        type: String,
        required: [true, "Product name is required"],
        trim: true,
        minlength: [2, "Product name must be atleast 2 character long"],
    },
    productDescription: {
        type: String,
        required: [true, "Description is required"]
        , maxlength: [1000, "Description length can't exceed 1000 character"]
    },
    price: {
        type: Number,
        required: [true, "Price is required"]
        , minlength: [0, "Price can't be a negative number"]
    },
    category: {
        type: String,
        required: true,
        enum: ['men', 'women', 'kids']
    },
    stock:{
        type:Number,
        required:[true,"Stock is required"]

    }
    


},
{timestamps:true}
)
export default mongoose.model("products", productModel)