import express from "express";
import { deleteTicketById, getAllTickets, getTicketsById, editTicketsById, postreq } from "../controller/raiseTicket.js";
const router = express.Router();



router.delete("/:ticketId", deleteTicketById);
router.get("/all", getAllTickets)
router.get("/:ticketId", getTicketsById)
router.put("/edit/:ticketId", editTicketsById)
router.post('/create', postreq)



export default router;
