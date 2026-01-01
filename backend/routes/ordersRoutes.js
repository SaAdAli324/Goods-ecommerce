
import express from "express"
import { authMiddleWare } from "../middleWare/jwt.js"

import { postOrders, getOrders, updateOrder, getOrdersForAdmin, updateOrderByAdmin } from "../controllers/orderController.js";
import { adminAuthMiddleWare } from "../middleWare/adminJwt.js";
const router = express.Router()

router.get("/admin/get/orders", adminAuthMiddleWare, getOrdersForAdmin)
router.post("/order", authMiddleWare, postOrders)
router.get("/get/orders", authMiddleWare, getOrders)
router.put("/update/orders/:orderId", authMiddleWare, updateOrder)
router.put("/update/orders/admin/:orderId", adminAuthMiddleWare, updateOrderByAdmin)

export default router