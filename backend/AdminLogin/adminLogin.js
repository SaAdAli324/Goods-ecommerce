
import User from '../models/signUpModel.js';
import bcrypt from 'bcrypt';
import { genrateToken } from '../utils/token.js';

export const adminlogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email , password);
        
        if (!email || !password) {
            return res.status(500).json({ message: "fields can't be empty", success: false })
        }
        const adminUser = await User.findOne({ email: email, role: "admin" })
        if (!adminUser) {
            return res.status(403).json({ message: "unauthorized", success: false })
        }
        const pass = await bcrypt.compare(password, adminUser.password)
        if (!pass) {
            return res.json({ message: "incorrect password", success: false })
        }
        console.log(adminUser.role);
        
        const token = genrateToken(adminUser)
        res.json({ message: 'login successfull', token: token })
    } catch (error) {
        console.log("error while signing in admin", error);
        res.json({message:"internal server error try again later!"})

    }
}