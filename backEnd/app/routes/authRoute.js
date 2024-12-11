import express from "express";
import { getAllUsers, login, register, verify } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/register",register)
authRouter.post("/login",login)
authRouter.get("/users",getAllUsers);
//api/auth/verify
authRouter.get("/verify",authMiddleware,verify)


export default authRouter;