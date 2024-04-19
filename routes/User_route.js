import express from "express";
import verifyToken from "../middleware/verifyJWT_Token.js";
import uploadfile from "../middleware/fileupload.js";
import { createTickets } from "../controller/raiseTicket.js";
import {getUserById} from "../controller/user.js";
const router = express.Router();


router.get("/", verifyToken, getUserById);
router.post("/:user_email", uploadfile, createTickets);

export default router;
  

