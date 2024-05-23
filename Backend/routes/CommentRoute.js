import express from "express";
import {postComment,getComments,deleteComment} from "../controllers/PostController.js"

const router = express.Router();


router.put("/postComment",postComment);
router.get("/getComment/:postId",getComments);
router.delete("/deleteComment",deleteComment);


export default router;