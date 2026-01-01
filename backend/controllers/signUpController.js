import User from "../models/signUpModel.js"
import bcrypt from 'bcrypt'
import { genrateToken } from "../utils/token.js"
import { log, profile } from "console"
export const signUp = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, address, phoneNumber } = req.body
        const uniqueEmail = await User.findOne({ email: email })


        if (uniqueEmail != null) {
            return res.status(500).json({ message: "Email must be unique", success: false })
        }
        if (!password && password.length >= 8) {
            return res.json({ message: "password length must be 8 or more", success: false })
        }
        if (!confirmPassword || password !== confirmPassword) {
            return res.json({ message: "confirm your password", success: false })
        }
        const hashedPassword = await bcrypt.hash(confirmPassword, 5)
        const user = new User({ name: name, email: email, password: hashedPassword, address: address, phoneNumber: phoneNumber })
        await user.save()
        console.log(user);

        const token = genrateToken(user._id)
        res.status(200).json({ token: token, message: "signed up successfully", success: true, user: { _id: user._id, name: user.name, email: user.email, avatar: user.avatar, role: user.role }, cart:user.cart })
    } catch (err) {
        if (err.name === "ValidationError") {
            const errors = Object.values(err.errors).map(e => e.message);
            return res.status(400).json({ messages: errors, success: false });
        }
        console.error("error while signing up the user", err)
        res.json({ message: "can't sign up something went wrong", success: false })
    }
}

export const userInfoUpdate = async (req, res) => {
    try {
        console.log("REQ USER:", req.user);
        console.log("REQ FILES:", req.files);
        console.log("REQ BODY:", req.body);
        const _id = req.user._id
        
        const updateUser = await User.findById(_id)

        const avatar = req.files.map(m => ({
            filename: m.filename,
            path: m.path
        }))
        const { name, email, password, confirmPassword, address, phoneNumber, } = req.body
        console.log(avatar);


        console.log(updateUser);

        if (!updateUser) {
            return res.status(404).json({ message: "User not found", success: false })
        }

        if (email !== updateUser.email) {
            const existingEmail = await User.findOne({ email });
            if (existingEmail) {
                return res.status(400).json({ message: "Email must be unique", success: false })
            }
        }

        let hashedPassword = updateUser.password;
        if (password) {
            if (password.length < 8) {
                return res.status(400).json({ message: "Password must be at least 8 characters", success: false })
            }
            if (password !== confirmPassword) {
                return res.status(400).json({ message: "Passwords do not match", success: false })
            }
            hashedPassword = await bcrypt.hash(password, 5);
        }
        if (name) updateUser.name = name
        if (email) updateUser.email = email
        if (address) updateUser.address = address
        if (phoneNumber) updateUser.phoneNumber = phoneNumber
        if (avatar) updateUser.avatar = avatar

        await updateUser.save()
        const token = genrateToken(updateUser._id)
        console.log(updateUser)

        res.status(200).json({
            success: true, message: "User info updated successfully", token: token, user: updateUser
        });
    } catch (err) {
        console.error("Error while updating user info:", err)
        res.status(500).json({ message: "Something went wrong", success: false })
    }
};



