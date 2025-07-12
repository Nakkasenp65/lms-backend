import userController from '../../controllers/userController.js';
import express from 'express';
// import auth from '../../middlewares/auth.js';
import passport from 'passport';

const userRouter = express.Router();

//BASE_URL/v1/user + /

userRouter
  .route('/')
  .get(userController.getUsers)
  .post(userController.createUser);

userRouter
  .route('/:userId')
  .get(
    passport.authenticate('jwt', { session: false }),
    userController.getUser,
  );

export default userRouter;
