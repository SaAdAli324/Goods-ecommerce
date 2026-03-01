import express from "express"
import { addToCart, removeFromCart , getCart} from "../controllers/cartController.js"
import { authMiddleWare } from "../middleWare/jwt.js"
const router = express.Router()

router.post("/add/:productId", authMiddleWare, addToCart)
router.delete("/remove/:productId",authMiddleWare, removeFromCart)
router.get("/getItems", authMiddleWare, getCart)
export default router