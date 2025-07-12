import authController from '../../controllers/authController.js';
import express from 'express';

const authRouter = express.Router();

// BASE_URL/v1/auth + /
authRouter.route('/register').post(authController.register);
authRouter.route('/login').post(authController.verifyEmail);
authRouter.route('/logout').post(authController.verifyEmail);
authRouter
  .route('/test-verfication-token')
  .get(authController.getVerficationToken);
authRouter.route('/verify-email').post(authController.verifyEmail);

export default authRouter;
