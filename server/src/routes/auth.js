const express = require('express');
const authRouter = express.Router();

authRouter.post('/signup', userCreation);

authRouter.post('/signup/verification', verifyEmail);

authRouter.post('/login', userAuth);

authRouter.get('/me', getUserProfile); // user profile

module.exports = authRouter;