import express from "express"
import { getProduct , postProduct , delProduct , updateProduct} from "../controllers/productController.js";
import upload from "../middleWare/multer.js"
import { adminAuthMiddleWare } from "../middleWare/adminJwt.js";
const router = express.Router()

router.post("/upload",upload.array('productImage',5), adminAuthMiddleWare,postProduct)
router.get("/display",getProduct)
router.delete("/delete/:_id",adminAuthMiddleWare,delProduct)
router.put("/update/:_id",upload.array('productImage',5),adminAuthMiddleWare,updateProduct)

export default router