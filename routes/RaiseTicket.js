import express from "express";
import { deleteTicketById } from "../controller/raiseTicket.js";
const router = express.Router();



router.delete("/:ticketId", deleteTicketById);



export default router;
