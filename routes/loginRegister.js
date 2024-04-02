import express from "express";
import Register from "../controller/register.js";
import Login from "../controller/login.js";
import Confirm from "../controller/confirm.js";
import ForgotPassword from '../controller/forgotPassword.js'
import verifyToken from "../Middleware/verifyToken.js";
import ResetPassword from "../controller/resetPassword.js";
import VerifyOTP from "../controller/verifyOTP.js";

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.get("/confirm", Confirm);
router.post("/forgot", ForgotPassword)
router.post("/verifyOtp", VerifyOTP)
router.post("/resetPassword", verifyToken, ResetPassword)


export default router;