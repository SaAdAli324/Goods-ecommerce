import express from 'express'

import { getAdminStats ,getMonthlyRevenue , getTopSellingProducts } from "../controllers/adminStatsController.js";
import { adminAuthMiddleWare } from "../middleWare/adminJwt.js";

const router = express.Router()

router.get("/stats", getAdminStats)
router.get("/monthly/stats", getMonthlyRevenue)
router.get("/topSelling", getTopSellingProducts)


export default router