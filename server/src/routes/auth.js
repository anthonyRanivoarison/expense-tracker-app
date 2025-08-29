import express from "express";
import { userCreation, verifyEmail } from "../controllers/authControllers.js";
const authRouter = express.Router();

authRouter.post('/signup', userCreation);

authRouter.post('/signup/verification', verifyEmail);

// authRouter.post('/login', userAuth);

// authRouter.get('/me', getUserProfile); // user profile

export default authRouter;