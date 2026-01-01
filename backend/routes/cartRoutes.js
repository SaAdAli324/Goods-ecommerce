import express from "express"
import { addToCart, removeFromCart } from "../controllers/cartController.js"
import { authMiddleWare } from "../middleWare/jwt.js"
const router = express.Router()

router.post("/add/:productId", authMiddleWare, addToCart)
router.delete("/remove/:productId",authMiddleWare, removeFromCart)
export default router