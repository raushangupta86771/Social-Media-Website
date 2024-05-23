import express from "express";
import { getNotifications, updateNotification } from "../controllers/NotificationController.js"

const router = express.Router();


router.get("/:userId", getNotifications);
router.put("/", updateNotification);


export default router;