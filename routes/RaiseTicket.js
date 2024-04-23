import express from "express";
import uploadfile from "../middleware/fileupload.js";
import { deleteTicketById, getAllTickets, getTicketsById, editTicketsById, postreq, sendImage } from "../controller/raiseTicket.js";
const router = express.Router();



router.delete("/:ticketId", deleteTicketById);
router.get("/all", getAllTickets)
router.get("/:ticketId", getTicketsById)
router.put("/edit/:ticketId", editTicketsById)
router.post('/create',uploadfile, postreq)
router.get("/photo/:ticketId", sendImage)


export default router;
