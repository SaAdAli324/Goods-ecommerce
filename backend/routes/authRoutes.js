import express from 'express'
import { logIn } from '../controllers/logInController.js'
import { signUp , userInfoUpdate } from '../controllers/signUpController.js'
import upload from "../middleWare/multer.js"
import { authMiddleWare } from '../middleWare/jwt.js'
const router = express.Router()

router.post("/login",logIn)
router.post("/signup",signUp)
router.put("/update",authMiddleWare,upload.array("avatar",1) , userInfoUpdate)

export default router