import express from "express";
import { createStory, getStories, insertUserViewId } from "../controllers/StoryController.js"

const router = express.Router();

router.post("/createStory", createStory);
router.get("/getStories/:userId", getStories);
router.put("/insertUserViewId", insertUserViewId);


export default router;