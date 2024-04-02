import express from "express";
import verifyToken from "../Middleware/verifyToken.js";
import { createTickets } from "../controller/raiseTicket.js";
import {getUserById} from "../controller/user.js"
import multer from 'multer';
const router = express.Router();


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'C:/TruAd/backend/TruAD_backend/store/uploads_image'); // Save files in the 'uploads' directory
    },
    filename: function(req, file, cb) {
      // Use the original file name as the saved file name
      cb(null, file.originalname);
    }
  });   
  
  const upload = multer({ storage: storage });

  
router.get("/", verifyToken, getUserById);
router.post("/:userId", createTickets);

export default router;
