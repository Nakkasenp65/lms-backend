import authController from '../../controllers/authController.js';
import express from 'express';

const authRouter = express.Router();

// BASE_URL/v1/auth + /

authRouter.route('/:token').post(authController.verifyEmail);
// authRouter.route('/'.get(authController.verifyToken));

export default authRouter;
