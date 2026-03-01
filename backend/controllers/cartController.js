import User from '../models/signUpModel.js'
import cartModel from '../models/cartModel.js';




export const getCart = async (req, res) => {
    try {
        const {product_id} = req.params
        if (product_id) {
            const checkOutProduct = await cartModel.items.findOne({productId:product_id}).populate("items.productId")
            res.status(200).json({message:"got the checkout item" , checkOutItem:checkOutProduct})
            return
        }
        const user_id = req.user._id
        console.log(user_id);

        const userCart = await cartModel.findOne({ user_id: user_id }).populate("items.productId")
        if (!userCart || userCart.length === 0) {
            return res.status(404).json({ message: "no item found in the cart", success: false })
        }
        console.log(userCart);

        res.status(200).json({ message: "got the cart item", cart: userCart })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error })
    }
}
export const addToCart = async (req, res) => {
    try {
        const user_id = req.user._id
        const { productId } = req.params
        const { quantity } = req.body
        

        const userCart = await cartModel.findOne({ user_id })
      

        if (userCart) {
            const itemIndex = userCart.items.findIndex(p=> p.productId.toString()===productId)
            if (itemIndex !== -1) {
                userCart.items[itemIndex].quantity += parseInt(quantity)
                await userCart.save()
                res.status(200).json({ message: "item added", cart: userCart  ,success:true})
                return
            }
            userCart.items.push({ quantity, productId })
            await userCart.save()
            res.status(200).json({ message: "item added", cart: userCart , success:true })
            return
        }
        const newCart = await cartModel.create({user_id:user_id , items:[{quantity:quantity , productId:productId}]})
        await newCart.save()
        
        res.status(200).json({ cartItem: newCart, message: "Item added to the cart", success: true })

    } catch (err) {
        if (err.name === "ValidationError") {
            const errors = Object.values(err.errors).map(e => e.message);
            console.log(errors);

            return res.status(400).json({ errors });
        }
        res.status(500).json({ message: "Server error" });
           console.error(err);
    }
 

}

export const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params
        const user_id = req.user._id


        const user = await cartModel.findOneAndUpdate(
            {user_id:user_id},
            {$pull:{items:{_id:productId}}},
            {new:true})
       
       await user.save()
       console.log(user);
       
        res.json({ message: "Item removed from the cart", success: true, cart: user })

    } catch (err) {
        res.json({ message: "could'nt remove the item try later", success: false })
        console.log("error while removing cart item", err);

    }
}
