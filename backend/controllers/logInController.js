import bcrypt from "bcrypt"
import User from '../models/signUpModel.js'
import { genrateToken } from "../utils/token.js";

export const logIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ message: "check your email or password", success: false });
        }
        if (!email || !password) {
            return res.json({ message: "fields can't be empty", success: false });
        }

        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            return res.json({ message: "check your email or password", success: false });
        }
        const token = genrateToken(user._id)
        console.log(user.cart);
        
        res.status(200).json({ token: token, message: "login successfull", success: true , user:{_id:user._id ,name:user.name , email:user.email , avatar:user.avatar , role:user.role} , cart:user.cart });
    } catch (err) {
        console.error("error while loging in user", err);
        res.json({ message: "error occured try again", success: false })


    }
}
