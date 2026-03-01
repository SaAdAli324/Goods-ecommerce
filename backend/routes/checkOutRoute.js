import express from "express"
import { authMiddleWare} from "../middleWare/jwt.js"
import { getCheckOutProduct } from "../controllers/checkOutController.js"

const router = express.Router()

router.get("/checkout/product/:_id" ,getCheckOutProduct)

export default router