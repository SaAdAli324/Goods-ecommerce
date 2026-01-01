import jwt from 'jsonwebtoken'
import dotenv from "dotenv"

dotenv.config()


export const genrateToken = (user)=>{
    return jwt.sign(
        {_id:user._id ,role:user.role},
        process.env.JWT_SECRET,
        {expiresIn:'7d'}
    )
}