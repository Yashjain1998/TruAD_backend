import express from "express";
import Register from "../controller/register.js";
import Login from "../controller/login.js";
import Confirm from "../controller/confirm.js";

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.get("/confirm", Confirm);



export default router;