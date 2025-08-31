import { Router } from "express";
import { userCreation, verifyEmail, userAuth, verifyEmailOnLogin } from "../controllers/authControllers.js";
const authRouter = Router();

authRouter.post('/signup', userCreation);

authRouter.post('/signup/verification', verifyEmail);

authRouter.post('/login', userAuth);

authRouter.post('/login/verification', verifyEmailOnLogin);

// authRouter.get('/me', getUserProfile); // user profile

export default authRouter;