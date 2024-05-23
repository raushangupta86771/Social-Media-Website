import express from "express";
import { getUser } from "../controllers/UserController.js"
import { updateUser } from "../controllers/UserController.js"
import { deleteUser } from "../controllers/UserController.js"
import { followUser } from "../controllers/UserController.js"
import { UnfollowUser, getAllUser } from "../controllers/UserController.js"

const router = express.Router();

router.get("/", getAllUser);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.put("/:id/follow", followUser);
router.put("/:id/Unfollow", UnfollowUser);

export default router;