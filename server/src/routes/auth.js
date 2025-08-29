import { Router } from "express";
import { userCreation, verifyEmail } from "../controllers/authControllers.js";
const authRouter = Router();

authRouter.post('/signup', userCreation);

authRouter.post('/signup/verification', verifyEmail);

// authRouter.post('/login', userAuth);

// authRouter.get('/me', getUserProfile); // user profile

export default authRouter;