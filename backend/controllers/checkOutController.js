import cartModel from "../models/cartModel.js";
import User from "../models/signUpModel.js"
export const getCheckOutProduct = async(req,res)=>{
    try {
        const {_id}= req.params
        const userCheckOutProduct = await cartModel.findOne({"items._id":_id}).populate("user_id" ,"name email address phoneNumber").populate("items.productId").lean()
        if (!userCheckOutProduct) {
            return res.status(404).json({message:"checkOut failed try again!" , success:false})
        }
        const selectedItem = userCheckOutProduct.items.find(item=> item._id.toString() ===_id)

        const checkOutData = {
            _id:userCheckOutProduct._id,
            user:userCheckOutProduct.user_id,
            product: selectedItem
        }
        res.status(200).json({message:"successfully got the checkout info" , success:true , checkOut:checkOutData})

        
    } catch (error) {
    console.error(error , "something went wrong! try againg later!");
        
    }
    
}