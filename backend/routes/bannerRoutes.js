import express from "express";

import { getBanners , postBanners ,deleteBanners } from "../controllers/bannerController.js";
import upload from "../middleWare/multer.js";
const router = express.Router()
router.get("/display", getBanners);
router.post("/upload", upload.array('bannerImage',5), postBanners);
router.delete("/delete/:_id", deleteBanners);

export default router