import User from '../models/signUpModel.js'

export const addToCart = async (req, res) => {
    try {
        console.log("User req " , req.user);
        console.log("Params req" , req.params);
        console.log("Body req", req.body);
        
        const _id=req.user._id
        const { productId } = req.params
        const { quantity } = req.body
        console.log("");
        

        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).json({ message: "add to cart failed ", success: false })
        }
        const ItemIndex = user.cart.findIndex(i => i.product.toString() === productId)

        if (ItemIndex > -1) {
            user.cart[ItemIndex].quantity += 1 || 1
        } else {
            user.cart.push({ product: productId, quantity: quantity || 1 })
        }

        await user.save()
        console.log(user.cart)
        res.status(200).json({ cartItem: user.cart, message: "Item added to the cart", success: true })

    } catch (err) {
        if (err.name === "ValidationError") {
            const errors = Object.values(err.errors).map(e => e.message);
            return res.status(400).json({ errors });
        }
        res.status(500).json({ message: "Server error" });
    }
}

export const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params
        const _id = req.user._id
        console.log(_id)
        
       const user= await User.findByIdAndUpdate(_id, { $pull: { cart: { product: productId } } }, { new: true })
        res.json({ message:"Item removed from the cart", success:true ,cart:user.cart })

    } catch (err) {
        res.json({ message:"could'nt remove the item try later", success:false})
        console.log("error while removing cart item", err);

    }
}
