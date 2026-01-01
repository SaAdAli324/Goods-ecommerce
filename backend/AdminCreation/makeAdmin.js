import mongoose from "mongoose";

import dotenv from "dotenv";
import User from "../models/signUpModel.js";
dotenv.config();

async function makeAdmin(email) {
    try {
        if (!email) {
            return console.log("email is requied");
        }
        await mongoose.connect(process.env.MONGO_URI);
        const admin = await User.findOneAndUpdate(
            { email: email },
            { role: "admin" },
            { new: true }
        );
         if (!admin) {
            return console.log("User not found");
        }
        
       
        console.log(`User with email ${email} has been promoted to admin.`, admin);


    } catch (error) {
        console.error("Error promoting user to admin:", error);
    }
}
makeAdmin(process.argv[2]);