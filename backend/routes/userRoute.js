import express from "express"
import { authMiddleWare } from "../middleWare/jwt.js";
import { getUserInfo } from "../controllers/userInfoController.js";

const router = express.Router()

router.get("/user/profile" ,authMiddleWare, getUserInfo)

export default router