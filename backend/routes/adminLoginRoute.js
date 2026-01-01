import { adminlogin } from "../AdminLogin/adminLogin.js";
import express from 'express'

const router = express.Router()

router.post("/adminPanel/login" , adminlogin)

export default router