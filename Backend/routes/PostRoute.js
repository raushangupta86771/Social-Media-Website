import express from "express";
import {createPost} from "../controllers/PostController.js"
import {getPost} from "../controllers/PostController.js"
import {updatePost} from "../controllers/PostController.js"
import {deletePost} from "../controllers/PostController.js"
import {likePost} from "../controllers/PostController.js"
import {getTimelinePosts} from "../controllers/PostController.js"
import {getSinglePost} from "../controllers/PostController.js"
import {postComment} from "../controllers/PostController.js"

const router = express.Router();

router.post("/",createPost);
router.get("/:id",getPost);
router.put("/:id",updatePost);
router.delete("/:id",deletePost);
router.put("/:id/like",likePost);
router.get("/:id/timeline",getTimelinePosts);
router.get("/:id/getSinglePost",getSinglePost);
// router.put("/postComment",postComment);


export default router;