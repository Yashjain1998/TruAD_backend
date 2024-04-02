import express from "express";
import verifyToken from "../Middleware/verifyToken.js";
import { createTickets } from "../controller/raiseTicket.js";
import {getUserById} from "../controller/user.js"
const router = express.Router();


router.get("/", verifyToken, getUserById);
router.post("/:userId", createTickets);

export default router;
  