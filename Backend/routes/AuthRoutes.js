import express from "express"
import { registerUser } from "../controllers/AuthController.js";
import { login } from "../controllers/AuthController.js";

const router=express.Router();

router.post("/register",registerUser);
router.post("/login",login);

export default router;