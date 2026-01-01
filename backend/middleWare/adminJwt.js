import express from 'express';
import jwt from 'jsonwebtoken';
import  dotenv from 'dotenv';

dotenv.config()

export const adminAuthMiddleWare = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "no token provided" });
    }
    const token = authHeader.split(" ")[1];
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if(!decoded.role || decoded.role !== "admin"){
                return res.status(403).json({message:"Access denied, admin only"})
            }
            req.user=decoded
            next()
    }catch(err){
        return res.status(403).json({message:"Invalid or expired token (login or signup)"})
    }
}

